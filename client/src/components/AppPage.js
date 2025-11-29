// client/src/components/AppPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from './DataTable';
import Chart from './Chart';

function AppPage() {
  const { name } = useParams();
  const [sections, setSections] = useState({});
  const [activeTab, setActiveTab] = useState('');

  // Clear state on app change
  useEffect(() => {
    setSections({});
    setActiveTab('');
  }, [name]);

  // Fetch and unwrap the payload
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await fetch(`/api/data/${name}`);
        const text = await resp.text();
        try {
          const json = JSON.parse(text);
          const apiResult = json.payload; // { status, timestamp, payload: {...} }
          const actualSections = apiResult && apiResult.payload ? apiResult.payload : {};
          if (mounted) setSections(actualSections);
        } catch (e) {
          console.error("JSON Parse Error. Response text:", text);
          if (mounted) setSections({});
        }
      } catch (err) {
        console.error("Fetch Error:", err);
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

  // Initialize or update active tab when sections loaded
  useEffect(() => {
    const keys = Object.keys(sections);
    if (keys.length > 0) {
      setActiveTab(prev => (keys.includes(prev) ? prev : keys[0]));
    }
  }, [sections]);

  // Guard: only render when data for activeTab exists
  const activeSection = sections[activeTab] || {};

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

      {/* Render only the active tab's tables or charts */}
      {activeTab && (
        <div className="section">
          {Object.entries(activeSection).map(([subKey, value]) => {
            const isConfig = value && typeof value === 'object' && !Array.isArray(value);
            const display = isConfig && value.display ? value.display : 'table';
            const data = isConfig && value.data ? value.data : value;
            const chartType = isConfig && value.chartType ? value.chartType : 'line';

            return (
              <div key={subKey} className="section mb-6">
                <h3 className="text-lg mb-2">{subKey}</h3>
                {display === 'chart' ? (
                  <Chart data={Array.isArray(data) ? data : []} type={chartType} />
                ) : (
                  <DataTable data={Array.isArray(data) ? data : []} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AppPage;
