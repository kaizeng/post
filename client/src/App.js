// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppPage from './components/AppPage';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/apps')
      .then(r => r.json())
      .then(setApps);
  }, []);

  return (
    <Router>
      <div className="app">
        <Sidebar apps={apps} />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage apps={apps} />} />
            <Route path="/app/:name" element={<AppPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
