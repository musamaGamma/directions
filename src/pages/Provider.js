import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const Provider = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.log("you must allow location to continue"),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  return (
    <div>
      {location ? (
        <MapContainer
          zoomControl={false}
          center={location}
          zoom={13}
          scrollWheelZoom
          className="w-full min-h-screen">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable={true} position={location} />
        </MapContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Provider;
