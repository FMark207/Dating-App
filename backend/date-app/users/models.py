from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.conf import settings

class Interest(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class FunFact(models.Model):
    text = models.CharField(max_length=200)
    
    def __str__(self):
        return self.text

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    age = models.IntegerField()
    location = models.TextField()
    distance = models.TextField()
    short_description = models.TextField()
    interests = models.ManyToManyField(Interest, related_name="profiles", blank=True)
    fun_facts = models.ManyToManyField(FunFact, related_name="profiles", blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", blank=True, null=True
    )

    def __str__(self):
        return f"{self.user.username}'s profile"