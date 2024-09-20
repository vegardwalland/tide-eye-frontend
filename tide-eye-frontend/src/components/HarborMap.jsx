import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Control the map instance
const MapControl = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};


const HarborMap = ({ selectedHarbors, harbors }) => {
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedHarbors.length > 0 && harbors.length > 0) {
      const selectedHarborData = harbors.filter(harbor =>
        selectedHarbors.includes(harbor.name)
      );

      if (selectedHarborData.length > 0) {
        // Calculate bounds to fit both harbors
        const newBounds = selectedHarborData.map(harbor => [
          harbor.latitude,
          harbor.longitude
        ]);

        setBounds(newBounds);
      }
    }
  }, [selectedHarbors, harbors]);

  return (
    <MapContainer
      center={[60.472, 8.4689]} // Default center
      zoom={5} // Default zoom
      style={{ height: '500px', width: '100%' }}
      whenCreated={mapInstance => { mapRef.current = mapInstance; }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedHarbors.length > 0 && harbors.length > 0 &&
        selectedHarbors.map((harborName, index) => {
          const harbor = harbors.find(h => h.name === harborName);
          if (harbor) {
            return (
              <Marker key={index} position={[harbor.latitude, harbor.longitude]}>
                <Popup>
                  <strong>{harbor.name}</strong>
                  <br />
                  Latitude: {harbor.latitude}, Longitude: {harbor.longitude}
                </Popup>
              </Marker>
            );
          }
          return null;
        })
      }
      <MapControl bounds={bounds} />
    </MapContainer>
  );
};

export default HarborMap;
