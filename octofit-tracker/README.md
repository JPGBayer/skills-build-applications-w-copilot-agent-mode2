# OctoFit Tracker

A social fitness application designed to help students stay active and compete with their peers.

## Features

- **User Profiles**: Track individual fitness levels and total points
- **Activity Logging**: Log various types of workouts (running, walking, cycling, swimming, strength training, yoga, sports)
- **Team Management**: Create and join teams to compete with friends
- **Competitive Leaderboard**: See top users and teams ranked by points
- **Personalized Tracking**: Monitor your fitness progress over time

## Technology Stack

- **Frontend**: React.js with Bootstrap for styling
- **Backend**: Python with Django REST Framework
- **Database**: SQLite (for development)
- **Development Environment**: GitHub Codespaces compatible

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 20+
- npm 10+

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd octofit-tracker/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create sample data (optional):
   ```bash
   python manage.py create_sample_data
   ```

6. Start the development server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd octofit-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/profiles/` - List user profiles
- `GET /api/activities/` - List activities
- `POST /api/activities/` - Create a new activity
- `GET /api/teams/` - List teams
- `POST /api/teams/` - Create a new team
- `POST /api/teams/{id}/join/` - Join a team
- `POST /api/teams/{id}/leave/` - Leave a team
- `GET /api/leaderboard/users/` - Get top users leaderboard
- `GET /api/leaderboard/teams/` - Get top teams leaderboard

## Project Structure

```
octofit-tracker/
├── backend/
│   ├── activities/          # Activity tracking app
│   ├── leaderboard/         # Leaderboard views
│   ├── octofit_tracker/     # Main Django project
│   ├── teams/               # Team management app
│   ├── users/               # User profiles app
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # React components
    │   ├── App.js
    │   ├── config.js        # API configuration
    │   └── index.js
    └── package.json
```

## Usage

1. Start both the backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Navigate through the application:
   - **Home**: Overview and quick links
   - **Activities**: Log your workouts and view your activity history
   - **Teams**: Create or join teams
   - **Leaderboard**: See how you rank against other users and teams

## Contributing

This project was created as part of the "Build applications with GitHub Copilot agent mode" workshop.

## License

MIT License - See LICENSE file for details
