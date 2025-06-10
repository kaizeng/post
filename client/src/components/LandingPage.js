import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage({ apps }) {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to App Dashboard</h1>
        <p>Your real-time application monitoring hub</p>
      </header>
      <main className="landing-main">
        {apps.map(app => (
          <Link key={app} to={`/app/${app}`} className="landing-card">
            <div className="card-content">
              <h2>{app}</h2>
              <p>View live data and metrics</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
export default LandingPage;