from rest_framework import serializers
from .models import Activity
from django.contrib.auth.models import User


class ActivitySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'username', 'activity_type', 'duration', 'distance', 
                  'calories', 'points', 'notes', 'date', 'created_at']
        read_only_fields = ['points', 'created_at', 'user']
    
    def create(self, validated_data):
        # Set the user from the request context
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
