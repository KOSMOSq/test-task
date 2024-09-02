'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const FilterPage = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/GetMakesForVehicleType/car?format=json`
    )
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results))
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    selectedVehicleType && selectedYear
      ? setIsEnabled(true)
      : setIsEnabled(false);
  }, [selectedVehicleType, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = [...Array(currentYear - 2015 + 1)].map((_, i) => 2015 + i);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Filter</h1>

      <select
        className="border p-2 mb-4 w-48"
        value={selectedVehicleType}
        onChange={(e) => setSelectedVehicleType(e.target.value)}
      >
        <option value="">Select type of vehicle</option>
        {vehicleTypes.map((type) => (
          <option key={type.MakeId} value={type.MakeId}>
            {type.MakeName}
          </option>
        ))}
      </select>

      <select
        className="border p-2 mb-4 w-48"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select year of model</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {isEnabled ? (
        <Link
          href={`/result/${selectedVehicleType}/${selectedYear}`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-400 text-white rounded">Next</span>
      )}
    </div>
  );
};

export default FilterPage;
