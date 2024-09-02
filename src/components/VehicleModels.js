"use client";

import { useEffect, useState } from "react";

const VehicleModels = ({ makeId, year }) => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )
      .then((response) => response.json())
      .then((data) => setModels(data.Results))
      .catch((error) => setError(error));
  }, [makeId, year]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return models.length === 0 ? (
    <p>No models found</p>
  ) : (
    <ul>
      {models.map((model) => (
        <li key={model.Model_ID} className="mb-2">
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
};

export default VehicleModels;
