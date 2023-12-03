from rest_framework import serializers
from .models import *
from nltk import sent_tokenize

class StandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standing
        fields = "__all__"
        depth = 1

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = "__all__"
        depth =1 
    
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['home_team_goals', 'away_team_goals']

class FixtureSerializer(serializers.ModelSerializer):
    result_set = ResultSerializer(many=True, read_only=True)

    class Meta:
        model = Fixture
        fields = ['id', 'season', 'home_team', 'away_team', 'match_date', 'result_set']
        depth =1 
    
class AwardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Awards
        fields = "__all__"
        depth=2

class SponsersSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Sponsers
        fields = "__all__"

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"

class GallerySerializer(serializers.ModelSerializer):
    # Define a field for handling image uploads
    images = serializers.ListField(child=serializers.ImageField(), write_only=True)
    
    class Meta:
        model = Gallery
        fields = '__all__'

    def create(self, validated_data):
        # Extract the list of images from the validated data
        images_data = validated_data.pop('images', [])

        # Create Image instances and associate them with the Gallery
        image_instances = []
        for image_data in images_data:
            image_serializer = ImagesSerializer(data={'images': image_data})
            if image_serializer.is_valid():
                image_instance = image_serializer.save()
                image_instances.append(image_instance)
            else:
                raise serializers.ValidationError(image_serializer.errors)

        # Create the Gallery instance
        gallery = Gallery.objects.create(**validated_data)
        # Add the created image instances to the gallery
        gallery.images.set(image_instances)
        
        return gallery

    
class GetGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = "__all__"
        depth = 1

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = "__all__"
        depth = 1

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = "__all__"
        depth=1




from django.db import transaction

class NewsAndAnnouncementSerializer(serializers.ModelSerializer):
    sub_description = serializers.SerializerMethodField()

    class Meta:
        model = NewsAndAnnouncement
        fields = '__all__'
        depth = 1

    @transaction.atomic
    def get_sub_description(self, obj):
        description = obj.description
        sub_descriptions = []

        image_tags = description.split('<image>')  # Split text by <image> tags

        # Initialize image index
        image_index = 0

        for tag in image_tags:
            # Add text before <image> tag
            sub_descriptions.append(tag)

            # Check if there's a corresponding image
            if image_index < len(obj.images.all()):
                image = obj.images.all()[image_index]
                # Add <img> tag for the image with <br> tags
                sub_descriptions.append(f"<br><img src='{image.images.url}' alt='Image'/><br>")

                # Increment image index
                image_index += 1

        # Combine sub-descriptions into a single string
        final_description = "".join(sub_descriptions)

        return final_description