from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import UserProfile
from activities.models import Activity
from teams.models import Team
from datetime import date, timedelta
import random


class Command(BaseCommand):
    help = 'Create sample data for OctoFit Tracker'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')
        
        # Create users
        users_data = [
            {'username': 'john_doe', 'email': 'john@example.com', 'first_name': 'John', 'last_name': 'Doe'},
            {'username': 'jane_smith', 'email': 'jane@example.com', 'first_name': 'Jane', 'last_name': 'Smith'},
            {'username': 'bob_wilson', 'email': 'bob@example.com', 'first_name': 'Bob', 'last_name': 'Wilson'},
            {'username': 'alice_brown', 'email': 'alice@example.com', 'first_name': 'Alice', 'last_name': 'Brown'},
            {'username': 'charlie_davis', 'email': 'charlie@example.com', 'first_name': 'Charlie', 'last_name': 'Davis'},
        ]
        
        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name'],
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            users.append(user)
        
        # Create user profiles
        fitness_levels = ['beginner', 'intermediate', 'advanced']
        for user in users:
            profile, created = UserProfile.objects.get_or_create(
                user=user,
                defaults={
                    'fitness_level': random.choice(fitness_levels),
                    'bio': f'Fitness enthusiast and {user.first_name} lover!',
                }
            )
            if created:
                self.stdout.write(f'Created profile for: {user.username}')
        
        # Create activities
        activity_types = ['running', 'walking', 'cycling', 'swimming', 'strength', 'yoga']
        for user in users:
            for i in range(random.randint(3, 8)):
                activity_date = date.today() - timedelta(days=random.randint(0, 30))
                duration = random.randint(20, 90)
                
                activity = Activity.objects.create(
                    user=user,
                    activity_type=random.choice(activity_types),
                    duration=duration,
                    distance=random.uniform(1, 15) if random.choice([True, False]) else None,
                    calories=duration * random.randint(5, 12),
                    date=activity_date,
                    notes=f'Great workout on {activity_date}!'
                )
                
                # Update profile points
                profile = user.profile
                profile.total_points += activity.points
                profile.save()
        
        self.stdout.write(f'Created activities for all users')
        
        # Create teams
        teams_data = [
            {'name': 'Morning Warriors', 'description': 'Early birds who love morning workouts!'},
            {'name': 'Fitness Fanatics', 'description': 'Dedicated to achieving fitness goals together.'},
            {'name': 'Night Owls', 'description': 'Evening workout enthusiasts.'},
        ]
        
        for i, team_data in enumerate(teams_data):
            team, created = Team.objects.get_or_create(
                name=team_data['name'],
                defaults={
                    'description': team_data['description'],
                    'captain': users[i % len(users)],
                }
            )
            if created:
                # Add random members
                team_members = random.sample(users, random.randint(2, 4))
                team.members.set(team_members)
                
                # Calculate team points
                team.total_points = sum(member.profile.total_points for member in team_members)
                team.save()
                
                self.stdout.write(f'Created team: {team.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully created sample data!'))
