import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import { useEffect, useState } from "react";
import { Autocomplete, IconButton, Paper, TextField } from "@mui/material";
import axios from "axios";
import PlacesAutoComplete from "./components/PlacesAutoComplete";

function App() {
  const [location, setLocation] = useState(null);
  const [userRefusal, setUserRefusal] = useState();
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // window.ReactNativeWebView.postMessage("hello world from directions api");
  });

  useEffect(() => {
    async function fetchLocations() {
      if (query === "") return setPlaces([]);
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&poly_geojson=0&addressdetails=1`
      );

      console.log(data);
      setPlaces(data);
    }

    fetchLocations();
  }, [query]);
  return (
    <div className="App">
      <Paper>
        <PlacesAutoComplete />
      </Paper>
      <Map
        location={location}
        setLocation={setLocation}
        setUserRefusal={setUserRefusal}
      />
    </div>
  );
}

export default App;
