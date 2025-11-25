from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Team
from .serializers import TeamSerializer

# Create your views here.

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        """Join a team"""
        team = self.get_object()
        user = request.user
        
        if user in team.members.all():
            return Response({'error': 'Already a member'}, status=status.HTTP_400_BAD_REQUEST)
        
        team.members.add(user)
        team.save()
        
        serializer = self.get_serializer(team)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        """Leave a team"""
        team = self.get_object()
        user = request.user
        
        if user not in team.members.all():
            return Response({'error': 'Not a member'}, status=status.HTTP_400_BAD_REQUEST)
        
        team.members.remove(user)
        team.save()
        
        serializer = self.get_serializer(team)
        return Response(serializer.data)

