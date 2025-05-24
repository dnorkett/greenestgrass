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

    // Filter out empty strings and trim whitespace
    const validCities = cities
      .map((city) => city.trim())
      .filter((city) => city !== "");

    console.log("Valid cities after filtering:", validCities);

    if (validCities.length < 2) {
      setResult({ error: "Please provide at least two cities." });
      setLoading(false);
      return;
    }

    try {
      const requestBody = {
        cities: validCities,
      };

      console.log("Sending request body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      console.log("Raw server response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setResult(data);
    } catch (error) {
      console.error("Detailed error:", error);
      setResult({ error: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">City Comparison</h1>
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