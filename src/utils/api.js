// src/utils/api.js

export async function fetchDisasters() {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  return [
    {
      id: 1,
      type: 'hurricane',
      location: 'Miami',
      severity: 'High',
      coordinates: { lat: 25.7617, lon: -80.1918 },
    },
    {
      id: 2,
      type: 'earthquake',
      location: 'Los Angeles',
      severity: 'Medium',
      coordinates: { lat: 34.0522, lon: -118.2437 },
    },
    {
      id: 3,
      type: 'wildfire',
      location: 'California',
      severity: 'Severe',
      coordinates: { lat: 36.7783, lon: -119.4179 },
    },
    // Add more sample alerts as needed
  ];
}
