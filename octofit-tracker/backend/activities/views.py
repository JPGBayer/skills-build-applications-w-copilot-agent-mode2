from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivitySerializer
from users.models import UserProfile

# Create your views here.

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    def get_queryset(self):
        """Filter activities by user if specified"""
        queryset = Activity.objects.all()
        user_id = self.request.query_params.get('user', None)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        return queryset
    
    def perform_create(self, serializer):
        """Save activity and update user points"""
        # Get or create a default user for demo purposes
        user = self.request.user if self.request.user.is_authenticated else User.objects.get_or_create(username='demo_user')[0]
        
        activity = serializer.save(user=user)
        
        # Update user profile points
        profile, created = UserProfile.objects.get_or_create(user=user)
        profile.total_points += activity.points
        profile.save()

