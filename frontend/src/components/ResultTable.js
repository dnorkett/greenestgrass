import React from "react";

function ResultTable({ result }) {
  if (!result) return null;
  
  if (result.error) {
    return <div className="alert alert-danger mt-4">{result.error}</div>;
  }
  
  if (!result.cities || result.cities.length === 0) {
    return <div className="alert alert-warning mt-4">No data available.</div>;
  }

  // Extract the column names dynamically from the first city's keys
  const columns = Object.keys(result.cities[0]);
  console.log("Result")


  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            {/* Render table headers dynamically based on the column names */}
            {columns.map((col) => (
              <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render a row for each city in the result */}
          {result.cities.map((city, idx) => (
            <tr key={idx}>
              {/* Render a cell for each column in the city */}
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