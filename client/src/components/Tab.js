// --------------------------------------------
// client/src/components/Tab.js
// --------------------------------------------
import React from 'react';
import DataTable from './DataTable';
import Chart from './Chart';

function Tab({ title, sections }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl mb-2">{title}</h2>
      {Object.entries(sections).map(([subKey, dataArray]) => (
        <section key={subKey} className="mb-6">
          <h3 className="text-lg font-semibold mb-1">{subKey}</h3>
          <DataTable data={dataArray} />
          <Chart data={dataArray} />
        </section>
      ))}
    </div>
  );
}

export default Tab;