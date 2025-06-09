// --------------------------------------------
// client/src/components/DataTable.js
// --------------------------------------------
import React from 'react';

function DataTable({ data }) {
  if (!Array.isArray(data) || data.length === 0) return <p>No data</p>;
  const columns = Object.keys(data[0]);
  return (
    <table className="table-auto w-full mb-4">
      <thead>
        <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;