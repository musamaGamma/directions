import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import { GpsFixedSharp, Money, Person } from "@mui/icons-material";

import L from "leaflet";

const gpsGreenIcon = new L.Icon({
  iconUrl: require("./assets/location_green.png"),
  iconRetinaUrl: require("./assets/location_green.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon bg-transparent border-none",
});

const gpsRedIcon = new L.Icon({
  iconUrl: require("./assets/placeholder.png"),
  iconRetinaUrl: require("./assets/placeholder.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon bg-transparent border-none",
});

const Map = ({ setUserRefusal, location, setLocation }) => {
  const [zoom, setZoom] = useState(13);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [pickUpLocation, setPickUpLocation] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState({
    lat: location?.lat,
    lng: location?.lng,
  });
  const [pickUpConfirmed, setPickUpConfirmed] = useState(false);
  const [dropOffConfirmed, setDropOffConfirmed] = useState(false);

  const [loading, setLoading] = useState(true);

  const pickUpRef = useRef(null);
  const dropOffRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const pickUp = pickUpRef.current;
        const dropOff = dropOffRef.current;
        if (pickUp != null) {
          const { lat, lng } = pickUp.getLatLng();

          setPickUpLocation({ lat, lng });
        }
        if (dropOff != null) {
          const { lat, lng } = dropOff.getLatLng();

          setDropOffLocation({ lat, lng });
        }
      },
    }),
    []
  );

  console.log({ pickUpLocation });

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

  useEffect(() => {
    if (location) {
      setPickUpLocation({
        lat: location.lat,
        lng: location.lng,
      });
      setDropOffLocation({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [location]);

  const handleConfirm = () => {
    if (!pickUpConfirmed) return setPickUpConfirmed(true);
    if (!dropOffConfirmed) return setDropOffConfirmed(true);
  };
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
            {pickUpConfirmed && dropOffConfirmed && (
              <RoutingMachine
                setDistance={setDistance}
                setTime={setTime}
                dropOffLocation={dropOffLocation}
                pickUpLocation={pickUpLocation}
              />
            )}

            {!pickUpConfirmed && (
              <Marker
                draggable={true}
                position={
                  pickUpLocation ?? { lat: location.lat, lng: location.lng }
                }
                eventHandlers={eventHandlers}
                className="text-green-400 bg-transparent"
                icon={gpsGreenIcon}
                ref={pickUpRef}
              />
            )}

            {pickUpConfirmed && !dropOffConfirmed && (
              <Marker
                draggable={true}
                position={dropOffLocation}
                eventHandlers={eventHandlers}
                className="text-green-400 bg-transparent"
                icon={gpsRedIcon}
                ref={dropOffRef}
              />
            )}
          </MapContainer>
        </Box>
      )}
      {loading && (
        <div className="grid place-items-center">
          <CircularProgress />
        </div>
      )}

      <Box className="absolute bottom-10 z-[99999]  left-[50%] -translate-x-[50%] w-[90%]">
        <Paper className="p-4" elevation={4}>
          <Box className="flex items-center justify-between border border-[#ddd] p-2 rounded-sm">
            <Box className="flex items-center space-x-2">
              <img
                className="h-[2rem] w-[3rem]"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1569015390/assets/fa/0e26a9-9d9d-4190-ad6d-a879ccef4266/original/Select.png"
              />
              <Box>
                <p className="text-[.8rem] text-left font-bold">GO economy</p>
                <p className="text-[.6rem] text-[#cbcaca] font-bold">
                  Affordable, everyday ride
                </p>
              </Box>
            </Box>
            <div>
              1-4 <Person className="text-[#cbcaca]" />
            </div>
          </Box>
        </Paper>

        {pickUpConfirmed && dropOffConfirmed ? (
          <Paper className="p-4 mt-3" elevation={4}>
            <Typography variant="body2" className="!font-bold text-xl">
              5566 sdg
            </Typography>
            <Box className="flex items-center space-x-2">
              <img src="/cash.png" className="h-6 w-10" /> <span>Cash</span>
            </Box>
            <Button
              variant="contained"
              className="!mt-3 !bg-[#489742] !font-normal w-full">
              confirm ride
            </Button>
          </Paper>
        ) : (
          <Button
            variant="contained"
            onClick={handleConfirm}
            className="!mt-3 !bg-[#489742] !font-normal">
            {pickUpConfirmed ? "confirm drop off" : "confirm pick up"}
          </Button>
        )}
      </Box>
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
