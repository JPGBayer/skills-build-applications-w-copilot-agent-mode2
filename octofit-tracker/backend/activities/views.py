from django.shortcuts import render
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
        activity = serializer.save(user=self.request.user)
        
        # Update user profile points
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        profile.total_points += activity.points
        profile.save()

