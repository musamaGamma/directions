import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({
  setDistance,
  setTime,
  dropOffLocation,
  pickUpLocation,
}) => {
  const handleRoutesFound = (event) => {
    const route = event.routes[0];
    setDistance(route.summary.totalDistance);
    setTime(route.summary.totalTime);
  };

  const handleRoutingError = (event) => {
    console.error(event.error);
  };

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(dropOffLocation.lat, dropOffLocation.lng),
      L.latLng(pickUpLocation.lat, pickUpLocation.lng),
    ],
    lineOptions: {
      styles: [{ color: "black", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,

    autoRoute: true,
  });

  instance.on("routesfound", handleRoutesFound);
  instance.on("routingerror", handleRoutingError);

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
