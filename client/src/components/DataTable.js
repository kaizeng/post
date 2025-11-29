// --------------------------------------------
// client/src/components/DataTable.js
// --------------------------------------------
import React from 'react';

function DataTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) return <p>No data</p>;
  const columns = Object.keys(data[0]);

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val > 0) return <span className="text-green">{val}</span>;
      if (val < 0) return <span className="text-red">{val}</span>;
    }
    // Check for string numbers like "+1.2%" or "-500"
    if (typeof val === 'string') {
      const num = parseFloat(val.replace(/[%$,]/g, ''));
      if (!isNaN(num)) {
        if (num > 0) return <span className="text-green">{val}</span>;
        if (num < 0) return <span className="text-red">{val}</span>;
      }
    }
    return val;
  };

  return (
    <table className="table-auto w-full mb-4">
      <thead>
        <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => <td key={col}>{formatValue(row[col])}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;