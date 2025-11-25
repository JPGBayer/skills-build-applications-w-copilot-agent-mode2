from django.contrib import admin
from .models import Team

# Register your models here.

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'captain', 'total_points', 'created_at']
    search_fields = ['name', 'captain__username']
    filter_horizontal = ['members']

