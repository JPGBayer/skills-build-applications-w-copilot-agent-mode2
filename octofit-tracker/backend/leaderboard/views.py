from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import UserProfile
from users.serializers import UserProfileSerializer
from teams.models import Team
from teams.serializers import TeamSerializer

# Create your views here.

@api_view(['GET'])
def user_leaderboard(request):
    """Get top users by points"""
    profiles = UserProfile.objects.all().order_by('-total_points')[:10]
    serializer = UserProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def team_leaderboard(request):
    """Get top teams by points"""
    teams = Team.objects.all().order_by('-total_points')[:10]
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)

