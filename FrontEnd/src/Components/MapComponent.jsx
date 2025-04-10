import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SelectableMap = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng); // Pass latitude and longitude
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapComponent = ({setFormData}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [humanReadableLocation, setHumanReadableLocation] = useState("");

  const handleLocationSelect = async (lat, lng) => {
    setSelectedLocation(`${lat}, ${lng}`);

    // Reverse Geocoding API Call
    const apiKey = "3dca32e22eb5440cae386a2c90b47f50"; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setHumanReadableLocation(data.results[0].formatted); // Extract human-readable address
        setFormData((data1)=>(
            {...data1,location:data.results[0].formatted}
        ))
    ;
    } else {
        setHumanReadableLocation("Unable to fetch location details");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setHumanReadableLocation("Error fetching location");
    }
  };

  return (
    <div>
      <MapContainer center={[53.3498,-6.2603]} zoom={13} style={{ height: "300px", width: "450px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SelectableMap onLocationSelect={handleLocationSelect} />
      </MapContainer>
      {/* <p>Selected Coordinates: {selectedLocation || "Click on the map to select a location"}</p> */}
      <p>Location : {humanReadableLocation || "Fetching location details..."}</p>
    </div>
  );
};

export default MapComponent;