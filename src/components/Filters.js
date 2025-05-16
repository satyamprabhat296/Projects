import React, { useState, useEffect } from 'react';

function Filters({ onLocationFilterChange }) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserLocation(location);

        // Optionally trigger filtering with current location initially
        onLocationFilterChange(selectedType, selectedLocation, location);
      });
    }
  }, []);

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    onLocationFilterChange(newType, selectedLocation, userLocation);
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    onLocationFilterChange(selectedType, newLocation, userLocation);
  };

  return (
    <section>
      <h2>Filters</h2>
      <div>
        <label htmlFor="disasterType">Disaster Type:</label>
        <select
          id="disasterType"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="all">All</option>
          <option value="hurricane">Hurricane</option>
          <option value="wildfire">Wildfire</option>
          <option value="earthquake">Earthquake</option>
          {/* Add more types as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="all">All</option>
          <option value="current">Current Location</option>
          <option value="city">Choose a City</option>
          {/* Add cities here if you want */}
        </select>
      </div>
    </section>
  );
}

export default Filters;
