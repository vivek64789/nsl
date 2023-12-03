from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Standing,Season,TopScorer,Club
from .serializers import *
from rest_framework.filters import OrderingFilter
from django.db.models import Count, F
from rest_framework.response import Response
from django.db.models import Sum,Min,Max
from rest_framework import status
from django_filters import rest_framework as filters
from .permission import CustomPermission
import nltk
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class TopScorerByPlayerView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season_id')

        top_scorers = TopScorer.objects.filter(season_id=season_id) \
            .annotate(max_goals=Max('goals_scored')) \
            .order_by('-max_goals')[:10]  # Get top 10 scorers

        if top_scorers:
            top_scorers_data = []
            base_url = os.getenv("ADDRESS") # Replace with your actual base URL

            top_scorers_data = []
            for scorer in top_scorers:
                top_scorers_data.append({
                    'player_name': scorer.player.name,
                    'goals_scored': scorer.max_goals,
                    'season_name': scorer.season.name,
                    'player_image': f"{base_url}{scorer.player.player_image.url}",
                    'club_image': f"{base_url}{scorer.player.club.logo.url}"
                })
            return Response(top_scorers_data)

        return Response({'message': 'No top scorers found for this season.'}, status.HTTP_404_NOT_FOUND)


class FastestGoalByPlayerView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season_id')
        
        fastest_goals = Result.objects.filter(fixture__season_id=season_id) \
            .exclude(fastest_goal_minute=None) \
            .annotate(min_goal_minute=Min('fastest_goal_minute')) \
            .order_by('min_goal_minute')[:10]  # Retrieve the top 10 fastest goals
        localhost = os.getenv("ADDRESS")
    

        if fastest_goals:
            goal_list = []
            for goal in fastest_goals:
                scorer_name = "Unknown"
                scorer_home_team = "Unknown"
                opposing_team = "Unknown"
                fastest_goal_minute = goal.min_goal_minute

                if goal.fastest_goal_scorer:
                    scorer_name = goal.fastest_goal_scorer.name
                    if goal.fastest_goal_scorer.club:
                        scorer_home_team = goal.fastest_goal_scorer.club.logo.url   # Assuming Player model has a 'team' field
                if goal.fixture.home_team:
                    opposing_team = goal.fixture.away_team.name
                elif goal.fixture.away_team:
                    opposing_team = goal.fixture.home_team.name

                goal_info = {
                    'player_name': scorer_name,
                    'player_home_team': f"{localhost}"+scorer_home_team,
                    'opposing_team': opposing_team,
                    'fastest_goal_minute': fastest_goal_minute
                }
                goal_list.append(goal_info)

            return Response(goal_list)

        return Response({'message': 'No fastest goals found for this season.'},status=404)


class TopScorerTeamView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season_id')
        
        # Query to find the top scorer team for the given season
        top_scorer_team = Result.objects.filter(fixture__season_id=season_id) \
            .values('fixture__home_team__name', 'fixture__away_team__name') \
            .annotate(total_goals=F('home_team_goals') + F('away_team_goals')) \
            .values_list('fixture__home_team__name', 'fixture__away_team__name', 'total_goals') \
            .order_by('-total_goals')[:1]
        localhost = os.getenv("SECOND_ADDRESS")
    
        
        if top_scorer_team:
            top_scorer_team = top_scorer_team[0]
            top_team_name = top_scorer_team[0] if top_scorer_team[0] else top_scorer_team[1]
            total_goals = top_scorer_team[2]
            
            # Query to find the total matches played by the top scorer team in the given season
            total_matches_played = Standing.objects.filter(season_id=season_id, club__name=top_team_name) \
                .aggregate(total_matches=Sum('matches_played'))['total_matches']
            
            # Query to fetch the logo URL of the top scorer team
            top_team_logo = Club.objects.filter(name=top_team_name).values_list('logo', flat=True).first()
            
            # Prepare the response data
            response_data = {
                'season_id': season_id,
                'top_scorer_team': top_team_name,
                'total_goals': total_goals,
                'total_matches_played': total_matches_played or 0,  # Handle None as 0
                'top_team_logo': f"{localhost}" + top_team_logo or "",  # Handle None as empty string
            }
            return Response(response_data)
        else:
            # No data found for the given season
            return Response({'message': 'No data found for the given season.'}, status=404)


class TotalGoalsView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season_id')
        
        total_goals_data = Result.objects.filter(fixture__season_id=season_id) \
            .values('fixture__season__name') \
            .annotate(total_goals=Sum(F('home_team_goals') + F('away_team_goals'))) \
            .order_by('-total_goals') \
            .first()

        if total_goals_data:
            season_name = total_goals_data['fixture__season__name']
            total_goals = total_goals_data['total_goals']
            total_matches_played = Standing.objects.filter(season_id=season_id) \
                .aggregate(total_matches=Sum('matches_played'))['total_matches']
            
            
            response_data = {
                'season_id': season_id,
                'total_goals': total_goals,
                'total_match_played': total_matches_played
            }
            return Response(response_data)
        else:
            return Response({'message': 'No data found for the given season.'}, status=404)


class TopResultsView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season_id')
        top_results = Result.objects.filter(fixture__season_id=season_id) \
            .annotate(total_goals=F('home_team_goals') + F('away_team_goals')) \
            .order_by('-total_goals')

        teams_data = []
        for result in top_results:
            team_name = result.fixture.home_team.name
            total_goals = result.total_goals
            teams_data.append({
                'team_name': team_name,
                'total_goals': total_goals
            })

        return Response(teams_data)
class TotalCardsView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        season_id = self.kwargs.get('season__id')
        total_cards = Result.objects.filter(fixture__season_id=season_id) \
            .aggregate(total_red_cards=Sum('red_cards_home_team') + Sum('red_cards_away_team'),
                       total_yellow_cards=Sum('yellow_cards_home_team') + Sum('yellow_cards_away_team'))
        
        return Response(total_cards)
    
class TopCardTeamsView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        localhost = os.getenv("ADDRESS")
        season_id = self.kwargs.get('season__id')
        
        top_card_teams = Result.objects.filter(fixture__season_id=season_id) \
            .annotate(total_cards=Sum('red_cards_home_team') + Sum('red_cards_away_team') +
                                  Sum('yellow_cards_home_team') + Sum('yellow_cards_away_team'),
                                  total_red_cards=Sum('red_cards_home_team') + Sum('red_cards_away_team'),
                                  total_yellow_cards=Sum('yellow_cards_home_team') + Sum('yellow_cards_away_team')) \
            .order_by('-total_cards')

        teams_data = []
        for result in top_card_teams:
            team_name = result.fixture.home_team.name
            total_cards = result.total_cards
            logo_image = result.fixture.home_team.logo.url
            teams_data.append({
                'team_name': team_name,
                'total_yellow_cards':result.total_yellow_cards,
                'total_red_cards':result.total_red_cards,
                'total_cards': total_cards,
                'logo':f"{localhost}"+logo_image
            })

        return Response(teams_data)



class StandingListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']

class StandingDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer


class SeasonView(generics.ListAPIView):
    permission_classes = [CustomPermission]
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer

class FixtureListView(generics.ListAPIView):
    permission_classes = [CustomPermission]
    serializer_class = FixtureSerializer
    filter_backends = [OrderingFilter]

    def get_queryset(self):
        season_id = self.request.query_params.get('season', None)
        if season_id:
            return Fixture.objects.filter(season_id=season_id).select_related('season', 'home_team', 'away_team').prefetch_related('result_set').order_by('match_date')
        return Fixture.objects.none()
    

class CreateGetAwards(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = Awards.objects.all()
    serializer_class = AwardsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
class UpdateAwardsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    serializer_class = AwardsSerializer
    queryset = Awards.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
class CreateGetSponsersView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = Sponsers.objects.all()
    serializer_class = SponsersSerailizer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
class UpdateSponsersView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Sponsers.objects.all()
    serializer_class = SponsersSerailizer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']

class CreateGetContactUsView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

class UpdateContactUsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class VideoView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = Video.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
class UpdateVideoView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']

class GalleryCreateWithImagesView(generics.CreateAPIView):
    permission_classes = [CustomPermission]
    serializer_class = GallerySerializer

    def create(self, request, *args, **kwargs):
        gallery_serializer = self.get_serializer(data=request.data)
        if gallery_serializer.is_valid():
            gallery_serializer.save()
            return Response(gallery_serializer.data, status=status.HTTP_201_CREATED)
        return Response(gallery_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve a list of all Gallery instances
class GalleryListView(generics.ListAPIView):
    permission_classes = [CustomPermission]
    queryset = Gallery.objects.all()
    serializer_class = GetGallerySerializer

# Retrieve details of a specific Gallery instance
class GalleryDetailView(generics.RetrieveAPIView):
    permission_classes = [CustomPermission]
    queryset = Gallery.objects.all()
    serializer_class = GetGallerySerializer

# Update an existing Gallery instance
class GalleryUpdateView(generics.UpdateAPIView):
    permission_classes = [CustomPermission]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

# Delete a specific Gallery instance
class GalleryDeleteView(generics.DestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer


class CreateGetClubView(generics.ListCreateAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
    
class UpdateClubView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']


class CreateGetPlayerView(generics.ListCreateAPIView):
    permission_classes = [CustomPermission]
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    def list(self, request, *args, **kwargs):
        # Extract the 'club_name' parameter from the query string
        club_name = request.GET.get('club_name')
        if club_name:
            self.queryset = self.queryset.filter(club__name__icontains=club_name)

        # Call the original list method to handle other filtering, pagination, etc.
        return super().list(request, *args, **kwargs)

class UpdatePlayerView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomPermission]
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['season__name']
class NewsAndAnnouncementListCreateView(generics.ListCreateAPIView):
    queryset = NewsAndAnnouncement.objects.all()
    serializer_class = NewsAndAnnouncementSerializer
    def get_queryset(self):
        # Download NLTK data if not already downloaded
        nltk.download('punkt')

        # Your other queryset logic
        return NewsAndAnnouncement.objects.all()
    
class UpdateNewsAndAnnouncementView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NewsAndAnnouncement.objects.all().order_by('-date')
    serializer_class = NewsAndAnnouncementSerializer
    

class LatestClubListView(generics.ListAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
from .testing import imagesData
from django.core.files import File 
import os 
from django.conf import settings
class CreateInstanceView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        for item in imagesData:
            # Create a Gallery instance
            gallery = Gallery.objects.create(
                season_id=1,  # Assuming season_id is always 1
                tittle=item['title'],
                sub_tittle=item['sub_title']
            )

            # Create Images instances and associate them with the Gallery
            for image_url in item['images']:
                # Remove leading and trailing slashes
                image_url = image_url.strip('/')

                # Construct the absolute path to the image
                absolute_path = os.path.join(settings.MEDIA_ROOT, image_url)

                # Open and save the image file
                with open(absolute_path, 'rb') as image_file:
                    image = Images()
                    image.images.save(os.path.basename(image_url), File(image_file), save=False)
                    image.save()

                # Associate the image with the gallery
                gallery.images.add(image)

        return Response('Finished', status=status.HTTP_201_CREATED)
    


    
