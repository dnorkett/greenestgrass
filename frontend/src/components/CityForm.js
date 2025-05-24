import React from "react";

function CityForm({ city1, city2, setCity1, setCity2, onCompare, loading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCompare();
      }}
    >
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="First city"
          value={city1}
          onChange={(e) => setCity1(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Second city"
          value={city2}
          onChange={(e) => setCity2(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
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
    </form>
  );
}

export default CityForm;