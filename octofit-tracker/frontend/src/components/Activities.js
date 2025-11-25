import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    activity_type: 'running',
    duration: '',
    distance: '',
    calories: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.activities);
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.activities, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
      
      if (response.ok) {
        fetchActivities();
        setNewActivity({
          activity_type: 'running',
          duration: '',
          distance: '',
          calories: '',
          notes: '',
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Activities</h2>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Log New Activity</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Activity Type</label>
                  <select
                    className="form-select"
                    name="activity_type"
                    value={newActivity.activity_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="cycling">Cycling</option>
                    <option value="swimming">Swimming</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duration"
                    value={newActivity.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    name="distance"
                    value={newActivity.distance}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Calories</label>
                  <input
                    type="number"
                    className="form-control"
                    name="calories"
                    value={newActivity.calories}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={newActivity.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={newActivity.notes}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-100">
                  Log Activity
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              {activities.length === 0 ? (
                <p className="text-muted">No activities logged yet. Start tracking your workouts!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Distance</th>
                        <th>Points</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity) => (
                        <tr key={activity.id}>
                          <td className="text-capitalize">{activity.activity_type}</td>
                          <td>{activity.duration} min</td>
                          <td>{activity.distance ? `${activity.distance} km` : '-'}</td>
                          <td>
                            <span className="badge bg-success">{activity.points} pts</span>
                          </td>
                          <td>{new Date(activity.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
