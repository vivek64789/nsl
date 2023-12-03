# Generated by Django 4.2.3 on 2023-09-16 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('khelxa', '0008_alter_awards_best_coach'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='newsandannouncement',
            options={'ordering': ['-date']},
        ),
        migrations.AlterField(
            model_name='standing',
            name='goal_difference',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='standing',
            name='goals_against',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='standing',
            name='goals_for',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='standing',
            name='red_cards',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='standing',
            name='yellow_cards',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]