import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for basic styling, MVP only
import CityForm from "./components/CityForm";
import ResultTable from "./components/ResultTable";

function App() {
  // State to manage the list of cities entered by the user
  const [cities, setCities] = useState(["", ""]);  // Initialize with two empty cities
  // State to store the result of the comparison
  const [result, setResult] = useState(null);
   // State to manage the loading state during API calls
  const [loading, setLoading] = useState(false);

  // Function to handle the comparison of cities
  const compareCities = async () => {
    setLoading(true); 
    setResult(null); 

    // Filter out empty city inputs
    const validCities = cities.filter((city) => city.trim() !== "");
    if (validCities.length < 2) {      
      setResult({ error: "Please provide at least two cities." });
      setLoading(false);
      return;
    }

    try {
      // Make a POST request to the backend API with the valid cities
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities: validCities }), // Send the cities array in the request body
      });

      if (!response.ok) {
        // If the response is not OK, throw an error with the response text
        const errorText = await response.text();
        throw new Error(`HTTP error! ${errorText}`);
      }

      // Parse the JSON response and set it as the result
      const data = await response.json();
      setResult(data);
    } catch (error) {
      // Handle any errors during the API call
      setResult({ error: error.message });
    } finally {
      // Set loading to false after the API call is complete
      setLoading(false);
    }
  };

 return (
    <div className="container py-5">      
      <div className="row justify-content-center">        
        <div className="col-lg-10">
          {/* Card to hold the form and results */}
          <div className="card shadow">
            <div className="card-body">
              {/* Title */}
              <h1 className="text-center mb-4">City Comparison</h1>
              {/* CityForm component for user input */}
              <CityForm
                cities={cities} // Pass the cities state
                setCities={setCities} // Pass the function to update cities
                onCompare={compareCities} // Pass the compareCities function
                loading={loading} // Pass the loading state
              />
              {/* ResultTable component to display the results */}
              <ResultTable result={result} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;