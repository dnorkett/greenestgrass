import React, { useState } from "react";
// Add this import to include Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./components/CityForm";
import ResultAlert from "./components/ResultAlert";

function App() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const compareCities = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ city1, city2 })
      });

      const data = await response.json();
      setResult(data.response);
    } catch (error) {
      setResult("Error fetching data");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">City Comparison</h1>
          <CityForm
            city1={city1}
            city2={city2}
            setCity1={setCity1}
            setCity2={setCity2}
            onCompare={compareCities}
            loading={loading}
          />
          <ResultAlert result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;