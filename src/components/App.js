import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Filters from './Filters';
import AlertList from './AlertList';
import Map from './Map';
import '../App.css';
import { fetchDisasters } from '../utils/api'; // also fix this path


function App() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const isWithinRadius = useCallback((location1, location2, radiusKm) => {
    if (!location1 || !location2) return false;

    const lat1 = location1.lat;
    const lon1 = location1.lon;
    const lat2 = location2.lat;
    const lon2 = location2.lon;

    const earthRadiusKm = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;

    return distanceKm <= radiusKm;
  }, []);

  const applyFilters = useCallback(() => {
    let filteredData = alerts;

    if (selectedType !== 'all') {
      filteredData = filteredData.filter((alert) => alert.type === selectedType);
    }

    if (selectedLocation === 'current' && userLocation) {
      filteredData = filteredData.filter((alert) =>
        isWithinRadius(alert.location, userLocation, 100)
      );
    } else if (selectedLocation !== 'all') {
      filteredData = filteredData.filter((alert) => alert.location === selectedLocation);
    }

    setFilteredAlerts(filteredData);
  }, [alerts, selectedType, selectedLocation, userLocation, isWithinRadius]);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await fetchDisasters();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }, []);

  // Fetch alerts once on mount
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  // Apply filters when alerts or filter states change
  useEffect(() => {
    applyFilters();
  }, [alerts, selectedType, selectedLocation, userLocation, applyFilters]);

  const handleLocationFilterChange = (type, location, userLoc) => {
    setSelectedType(type);
    setSelectedLocation(location);
    if (userLoc) setUserLocation(userLoc);
  };

  // User location fetch on mount (optional)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Filters onLocationFilterChange={handleLocationFilterChange} />
      <AlertList alerts={filteredAlerts} />
      <Map alerts={filteredAlerts} />
    </div>
  );
}

export default App;
