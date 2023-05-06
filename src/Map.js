import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const Map = ({ setUserRefusal, location, setLocation }) => {
  const [zoom, setZoom] = useState(13);

  const [loading, setLoading] = useState(true);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLocation({ lat, lng });
        }
      },
    }),
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => setUserRefusal("you must allow location to continue"),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  console.log({ loading });
  return (
    <>
      {location && (
        <Box className="">
          <MapContainer
            whenReady={() => setLoading(false)}
            center={location}
            zoom={13}
            scrollWheelZoom
            className="w-full min-h-screen">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              ref={markerRef}
              position={location}
              draggable
              eventHandlers={eventHandlers}>
              <Popup>my health center location</Popup>
            </Marker>

            <MyLocation markerRef={markerRef} setLocation={setLocation} />
          </MapContainer>
        </Box>
      )}
      {loading && (
        <div className="grid place-items-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

function MyLocation({ markerRef, setLocation }) {
  const map = useMapEvents({
    click: (e) => {
      setLocation(e.latlng);
    },
  });
  return null;
}

export default Map;
