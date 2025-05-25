import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityForm from "./components/CityForm";
import ResultTable from "./components/ResultTable";

function App() {
  const [cities, setCities] = useState(["", ""]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const compareCities = async () => {
    setLoading(true);
    setResult(null);

    const validCities = cities.filter((city) => city.trim() !== "");
    if (validCities.length < 2) {
      setResult({ error: "Please provide at least two cities." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities: validCities }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${errorText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">City Comparison</h1>
              <CityForm
                cities={cities}
                setCities={setCities}
                onCompare={compareCities}
                loading={loading}
              />
              <ResultTable result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;