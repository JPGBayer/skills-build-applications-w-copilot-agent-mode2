import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <img 
            src="/octofitapp-small.png" 
            alt="OctoFit Logo" 
            className="mb-4"
            style={{ maxWidth: '300px' }}
          />
          <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, compete with your peers, and achieve your health goals!
          </p>
          
          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-activity"></i> Track Activities
                  </h5>
                  <p className="card-text">
                    Log your workouts and fitness activities to earn points.
                  </p>
                  <Link to="/activities" className="btn btn-primary">
                    View Activities
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-people"></i> Join Teams
                  </h5>
                  <p className="card-text">
                    Create or join teams to compete with your friends.
                  </p>
                  <Link to="/teams" className="btn btn-primary">
                    View Teams
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-trophy"></i> Compete
                  </h5>
                  <p className="card-text">
                    Check the leaderboard and see how you rank against others.
                  </p>
                  <Link to="/leaderboard" className="btn btn-primary">
                    View Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
