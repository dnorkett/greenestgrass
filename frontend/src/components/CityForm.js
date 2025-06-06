import React from "react";

function CityForm({ cities, setCities, onCompare, loading }) {
  // Function to handle changes in city input fields
  const handleCityChange = (index, value) => {
    const updatedCities = [...cities]; // Create a copy of the cities array
    updatedCities[index] = value; // Update the city at the specified index
    setCities(updatedCities); // Update the state with the modified array
  };

  // Function to add a new empty city input field
  const addCity = () => setCities([...cities, ""]); // Append an empty string to the cities array

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        onCompare(); // Call the onCompare function passed as a prop
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        {/* Render an input field for each city in the cities array */}
        {cities.map((city, index) => (
          <div className="mb-3" key={index}>
            <input
              type="text"
              className="form-control"
              placeholder={`City ${index + 1}`} // Dynamic placeholder for each city
              value={city} // Bind the input value to the corresponding city
              onChange={(e) => handleCityChange(index, e.target.value)} // Update the city on input change
            />
          </div>
        ))}
        <div className="mb-3 d-flex justify-content-between">
          {/* Button to add a new city input field */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={addCity}
          >
            Add City
          </button>          
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Comparing..." : "Compare Cities"} {/* Show loading state */}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CityForm;