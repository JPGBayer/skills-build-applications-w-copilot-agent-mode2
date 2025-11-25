from rest_framework import serializers
from .models import Team
from users.serializers import UserSerializer


class TeamSerializer(serializers.ModelSerializer):
    captain = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'captain', 'members', 'member_count',
                  'total_points', 'created_at', 'updated_at']
        read_only_fields = ['total_points', 'created_at', 'updated_at']
    
    def get_member_count(self, obj):
        return obj.members.count()
