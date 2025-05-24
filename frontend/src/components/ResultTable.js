import React from "react";

function ResultTable({ result }) {
  if (!result) return null;
  
  if (result.error) {
    return (
      <div className="alert alert-danger mt-4">
        {result.error}
      </div>
    );
  }
  
  if (!Array.isArray(result.cities) || result.cities.length === 0) {
    return (
      <div className="alert alert-warning mt-4">
        No data available.
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>City</th>
            <th>Weather</th>
            <th>Culture</th>
            <th>Cost of Living</th>
            <th>Job Opportunities</th>
          </tr>
        </thead>
        <tbody>
          {result.cities.map((city, idx) => (
            <tr key={idx}>
              <td>{city.name}</td>
              <td>{city.weather}</td>
              <td>{city.culture}</td>
              <td>{city.costOfLiving}</td>
              <td>{city.jobOpportunities}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {result.summary && (
        <div className="alert alert-info" style={{ whiteSpace: "pre-wrap" }}>
          <strong>Summary:</strong> {result.summary}
        </div>
      )}
    </div>
  );
}

export default ResultTable;