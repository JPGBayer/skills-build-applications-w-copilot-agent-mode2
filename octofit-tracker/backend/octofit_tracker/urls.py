"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.views import UserProfileViewSet
from activities.views import ActivityViewSet
from teams.views import TeamViewSet
from leaderboard.views import user_leaderboard, team_leaderboard
import os

# Create router and register viewsets
router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'teams', TeamViewSet)

@api_view(['GET'])
def api_root(request):
    """API root endpoint with available endpoints"""
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = "http://localhost:8000"
    
    return Response({
        'profiles': f'{base_url}/api/profiles/',
        'activities': f'{base_url}/api/activities/',
        'teams': f'{base_url}/api/teams/',
        'user_leaderboard': f'{base_url}/api/leaderboard/users/',
        'team_leaderboard': f'{base_url}/api/leaderboard/teams/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('api/leaderboard/users/', user_leaderboard, name='user-leaderboard'),
    path('api/leaderboard/teams/', team_leaderboard, name='team-leaderboard'),
]

