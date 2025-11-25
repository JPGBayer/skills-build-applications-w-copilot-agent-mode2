import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.teams);
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.teams, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });
      
      if (response.ok) {
        fetchTeams();
        setNewTeam({ name: '', description: '' });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleChange = (e) => {
    setNewTeam({
      ...newTeam,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Teams</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create Team'}
        </button>
      </div>
      
      {showCreateForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Team</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newTeam.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={newTeam.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Create Team
              </button>
            </form>
          </div>
        </div>
      )}
      
      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <p className="text-muted">No teams yet. Be the first to create one!</p>
          </div>
        ) : (
          teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description || 'No description'}</p>
                  <div className="mb-2">
                    <small className="text-muted">
                      Captain: {team.captain ? team.captain.username : 'None'}
                    </small>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">
                      Members: {team.member_count || 0}
                    </small>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-primary">
                      {team.total_points} points
                    </span>
                  </div>
                  <button className="btn btn-sm btn-outline-primary">
                    Join Team
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Teams;
