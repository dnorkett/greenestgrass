import React from "react";

function CityForm({ cities, setCities, onCompare, loading }) {
  const handleCityChange = (index, value) => {
    const updatedCities = [...cities];
    updatedCities[index] = value;
    console.log(`Updating city at index ${index}:`, value); // Debugging log
    setCities(updatedCities);
  };

  const addCity = () => {
    setCities([...cities, ""]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCompare();
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "400px" }}>
        {cities.map((city, index) => (
          <div className="mb-3" key={index}>
            <input
              type="text"
              className="form-control"
              placeholder={`City ${index + 1}`}
              value={city}
              onChange={(e) => handleCityChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="mb-3 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={addCity}
          >
            + Add City
          </button>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Comparing...
              </>
            ) : (
              "Compare Cities"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CityForm;