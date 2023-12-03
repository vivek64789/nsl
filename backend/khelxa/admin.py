from django.contrib import admin
from .models import Club, Fixture, Standing, Result, Player, TopScorer, Season, Awards, Sponsers, ContactUs, Video, Images, Gallery, NewsAndAnnouncement

# Update the Django admin site header
admin.site.site_header = "Nepal Super League"

class PlayerAdmin(admin.ModelAdmin):
    list_filter = ('name', 'club')

# Register models from the "khelxa" app
admin.site.register(Club)
admin.site.register(Fixture)
admin.site.register(Standing)
admin.site.register(Result)
admin.site.register(TopScorer)
admin.site.register(Season)
admin.site.register(Awards)
admin.site.register(Sponsers)
admin.site.register(ContactUs)
admin.site.register(Video)
admin.site.register(Images)
admin.site.register(Gallery)
admin.site.register(NewsAndAnnouncement)

# Register the Player model with the custom PlayerAdmin class
admin.site.register(Player, PlayerAdmin)