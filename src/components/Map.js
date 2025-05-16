// src/components/Map.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ alerts }) {
  return (
    <section>
      <h2>Disaster Map</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        {alerts.map((alert) =>
          alert.location && alert.location.lat && alert.location.lon ? (
            <Marker
              key={alert.id}
              position={[alert.location.lat, alert.location.lon]}
            >
              <Popup>
                <strong>{alert.type}</strong><br />
                Location: {alert.location.name || 'Unknown'}<br />
                Severity: {alert.severity}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </section>
  );
}

export default Map;
