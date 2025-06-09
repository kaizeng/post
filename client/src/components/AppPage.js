import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from './DataTable';

function AppPage() {
  const { name } = useParams();
  const [sections, setSections] = useState({});
  const [activeTab, setActiveTab] = useState('');

  // Fetch and unwrap the payload
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await fetch(`/api/data/${name}`);
        const json = await resp.json();
        const apiResult = json.payload;                   // { status, timestamp, payload: {...} }
        const actualSections = apiResult.payload || {};
        if (mounted) setSections(actualSections);
      } catch {
        if (mounted) setSections({});
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [name]);

  // Initialize or update active tab when sections change
  useEffect(() => {
    const keys = Object.keys(sections);
    if (keys.length > 0) {
      setActiveTab(prev => keys.includes(prev) ? prev : keys[0]);
    }
  }, [sections]);

  return (
    <div className="content">
      <h1 className="text-2xl mb-4">{name}</h1>

      {/* Tab buttons */}
      <div className="tabs">
        {Object.keys(sections).map(tab => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render only the active tab's tables */}
      {activeTab && (
        <div className="section">
          {Object.entries(sections[activeTab]).map(([subKey, arr]) => (
            <div key={subKey} className="section mb-6">
              <h3 className="text-lg mb-2">{subKey}</h3>
              <DataTable data={Array.isArray(arr) ? arr : []} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppPage;