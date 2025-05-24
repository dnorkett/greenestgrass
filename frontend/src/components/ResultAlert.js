import React from "react";

function ResultAlert({ result }) {
  if (!result) return null;
  return (
    <div className="alert alert-info mt-4" style={{ whiteSpace: "pre-wrap" }}>
      {result}
    </div>
  );
}

export default ResultAlert;