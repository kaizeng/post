// --------------------------------------------
// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppPage from './components/AppPage';

function App() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/apps')
      .then(r => r.json())
      .then(setApps);
  }, []);

  if (apps.length === 0) return <div className="content">Loading apps…</div>;

  return (
    <div className="app">
      <Router>
        <Sidebar apps={apps} />
        <div className="content">
          <Routes>
            <Route path="/app/:name" element={<AppPage />} />
            <Route path="*" element={<Navigate to={`/app/${apps[0]}`} replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;