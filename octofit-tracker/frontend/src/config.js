const getBaseURL = () => {
  const codespace = process.env.CODESPACE_NAME || window.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

const API_BASE_URL = getBaseURL();

export const API_ENDPOINTS = {
  profiles: `${API_BASE_URL}/api/profiles/`,
  activities: `${API_BASE_URL}/api/activities/`,
  teams: `${API_BASE_URL}/api/teams/`,
  userLeaderboard: `${API_BASE_URL}/api/leaderboard/users/`,
  teamLeaderboard: `${API_BASE_URL}/api/leaderboard/teams/`,
};

export default API_BASE_URL;
