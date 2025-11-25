from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    captain = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='captained_teams')
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    total_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-total_points', 'name']

