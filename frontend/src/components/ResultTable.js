import React from "react";

function ResultTable({ result }) {
  if (!result) return null;

  if (result.error) {
    return <div className="alert alert-danger mt-4">{result.error}</div>;
  }

  if (!result.cities || result.cities.length === 0) {
    return <div className="alert alert-warning mt-4">No data available.</div>;
  }

  const columns = Object.keys(result.cities[0]);

  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.cities.map((city, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{city[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;