import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';

const Leaderboard = () => {
  const [userLeaderboard, setUserLeaderboard] = useState([]);
  const [teamLeaderboard, setTeamLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      const [usersResponse, teamsResponse] = await Promise.all([
        fetch(API_ENDPOINTS.userLeaderboard),
        fetch(API_ENDPOINTS.teamLeaderboard),
      ]);
      
      const usersData = await usersResponse.json();
      const teamsData = await teamsResponse.json();
      
      setUserLeaderboard(usersData);
      setTeamLeaderboard(teamsData);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    }
  };

  const getMedalIcon = (index) => {
    switch(index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </li>
      </ul>
      
      {activeTab === 'users' ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Top Users</h5>
            {userLeaderboard.length === 0 ? (
              <p className="text-muted">No users on the leaderboard yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Fitness Level</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLeaderboard.map((profile, index) => (
                      <tr key={profile.id}>
                        <td className="fw-bold">{getMedalIcon(index)}</td>
                        <td>{profile.username}</td>
                        <td className="text-capitalize">
                          <span className={`badge ${
                            profile.fitness_level === 'advanced' ? 'bg-success' :
                            profile.fitness_level === 'intermediate' ? 'bg-warning' :
                            'bg-info'
                          }`}>
                            {profile.fitness_level}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-primary">
                            {profile.total_points} pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Top Teams</h5>
            {teamLeaderboard.length === 0 ? (
              <p className="text-muted">No teams on the leaderboard yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Team</th>
                      <th>Captain</th>
                      <th>Members</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamLeaderboard.map((team, index) => (
                      <tr key={team.id}>
                        <td className="fw-bold">{getMedalIcon(index)}</td>
                        <td>{team.name}</td>
                        <td>{team.captain ? team.captain.username : 'None'}</td>
                        <td>{team.member_count || 0}</td>
                        <td>
                          <span className="badge bg-primary">
                            {team.total_points} pts
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
