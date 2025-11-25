from django.contrib import admin
from .models import UserProfile

# Register your models here.

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'fitness_level', 'total_points', 'created_at']
    list_filter = ['fitness_level']
    search_fields = ['user__username', 'user__email']

