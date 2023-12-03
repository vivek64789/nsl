from django.db import models

class Season(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.name

class Club(models.Model):
    season = models.ForeignKey(Season,on_delete=models.CASCADE,null=True)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    founded_year = models.PositiveIntegerField()
    stadium = models.CharField(max_length=100,null=True,blank=True)
    logo = models.ImageField(upload_to='club_logos/', null=True, blank=True)
   
    def __str__(self):
        return self.name

class Fixture(models.Model):
    season = models.ForeignKey(Season,on_delete=models.CASCADE,related_name='season_fixtures')
    home_team = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='home_fixtures')
    away_team = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='away_fixtures')
    match_date = models.DateTimeField()
    location = models.CharField(max_length=100)
    

    def __str__(self):
        return f"{self.home_team.name} vs. {self.away_team.name}"

class Standing(models.Model):
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    matches_played = models.PositiveIntegerField(default=0)
    wins = models.PositiveIntegerField(default=0)
    draws = models.PositiveIntegerField(default=0)
    losses = models.PositiveIntegerField(default=0)
    goals_for = models.PositiveIntegerField(default=0,null=True,blank=True)
    goals_against = models.PositiveIntegerField(default=0,null=True,blank=True)
    goal_difference = models.IntegerField(default=0,null=True,blank=True)
    points = models.PositiveIntegerField(default=0)
    red_cards = models.PositiveIntegerField(default=0,null=True,blank=True)
    yellow_cards = models.PositiveIntegerField(default=0,null=True,blank=True)
    rank = models.PositiveBigIntegerField(null=True,blank=True
                                          )
    class Meta:
        ordering = ['rank']

    def __str__(self):
        return f"{self.club.name} - Points: {self.points}"
class Player(models.Model):
    position_types = (
        ('Mid Fielder','mid_fielder'),
        ('Forward','farward'),
        ('Goal Kepper','goal_kepper'),
        ('Defender','defender'),
        ('Coach','COACH'),
        ('Manager','MANAGER')
    )
    name = models.CharField(max_length=100)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    goals_scored = models.PositiveIntegerField(default=0,blank=True)
    red_cards = models.PositiveIntegerField(default=0,blank=True)
    yellow_cards = models.PositiveIntegerField(default=0,blank=True)
    player_image = models.ImageField(upload_to='player_images/', null=True, blank=True)
    position = models.CharField(max_length=30,choices=position_types,blank=True)

    def __str__(self):
        return f'{self.name}_{self.club.name}_{self.position}'

class Result(models.Model):
    fixture = models.ForeignKey(Fixture, on_delete=models.CASCADE)
    home_team_goals = models.PositiveIntegerField()
    away_team_goals = models.PositiveIntegerField()
    red_cards_home_team = models.PositiveIntegerField(default=0)
    red_cards_away_team = models.PositiveIntegerField(default=0)
    yellow_cards_home_team = models.PositiveIntegerField(default=0)
    yellow_cards_away_team = models.PositiveIntegerField(default=0)
    fastest_goal_minute = models.PositiveIntegerField(null=True, blank=True)
    fastest_goal_scorer = models.ForeignKey(Player, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.fixture} - Result: {self.home_team_goals} - {self.away_team_goals}"


class TopScorer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    goals_scored = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.player.name} - Goals Scored: {self.goals_scored} - Season: {self.season.name}"


class Awards(models.Model):
    season = models.OneToOneField(Season,on_delete=models.CASCADE)
    best_goalkepper = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_goalkepper')
    best_defender = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_defender')
    best_midfielder = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_midfielder')
    best_forward = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_forward')
    best_emerging = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_emerging')
    best_coach = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='best_coach')
    man_of_season = models.ForeignKey(Player,on_delete=models.CASCADE,related_name='man_of_season',null=True)

    def __str__(self):
        return f"{self.season.name} Awards"
class Sponsers(models.Model):
    season = models.ForeignKey(Season,on_delete=models.CASCADE)
    sponser_name = models.CharField(max_length=100)
    sponser_image = models.ImageField(upload_to='sponser_image/')

    def __str__(self):
        return str(self.sponser_name)
    
class ContactUs(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=30)
    message = models.TextField(max_length=200)

    def __str__(self):
        return self.name

class Video(models.Model):
    tittle = models.CharField(max_length=100)
    sub_tittle = models.CharField(max_length=100)
    season = models.ForeignKey(Season,on_delete=models.CASCADE)
    video_url = models.URLField(max_length=60)

    def __str__(self):
        return self.tittle
    
class Images(models.Model):
    images = models.ImageField(upload_to='gallery/') 

    def __str__(self):
        return self.images.url   

    
class Gallery(models.Model):
    season = models.ForeignKey(Season,on_delete=models.CASCADE)
    tittle = models.CharField(max_length=100)
    sub_tittle = models.CharField(max_length=100)
    images = models.ManyToManyField(Images)

class NewsAndAnnouncement(models.Model):
    news_type = (
        ('news','NEWS'),
        ('announcement','ANNOUNCEMENT')
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(choices=news_type,max_length=20,null=True)
    images = models.ManyToManyField(Images, related_name='news_and_announcements', blank=True)
    date = models.DateTimeField(null=True,blank=True)
    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title