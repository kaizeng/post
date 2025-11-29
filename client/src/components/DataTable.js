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
    // Check for string numbers like "+1.2%", "-500", or "(0.301)"
    if (typeof val === 'string') {
      // Remove currency symbols, percentages, and commas for parsing
      let cleanVal = val.replace(/[%$,]/g, '');
      let multiplier = 1;

      // Handle parentheses for negative numbers e.g. (0.301) or (1.2%)
      // Note: cleanVal will be (0.301) or (1.2) after % is removed
      if (cleanVal.startsWith('(') && cleanVal.endsWith(')')) {
        cleanVal = cleanVal.slice(1, -1);
        multiplier = -1;
      }

      const num = parseFloat(cleanVal) * multiplier;
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