import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const PlacesAutoComplete = () => {
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState("");
  const [startPoint, setStartPoint] = useState();
  const [locations, setLocations] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleHide = () => {
    console.log("hello");
    setHidden(true);
  };

  const handleShow = () => {
    setHidden(false);
  };

  useEffect(() => {
    async function fetchLocations() {
      if (query === "") return setLocations([]);
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&poly_geojson=0&addressdetails=1`
      );

      console.log(data);
      setLocations(data);
    }

    fetchLocations();
  }, [query]);

  console.log({ startPoint });
  return (
    <div
      className={`absolute  top-[15%] z-[9999] transition-all  duration-500   -translate-y-[50%] w-[90%] ${
        hidden ? "left-[-47.5%]" : "left-[50%] -translate-x-[50%]"
      }`}>
      <form className="w-full flex items-center" onSubmit={handleSubmit}>
        <div className="p-2  bg-white  shadow-black/30 shadow rounded-full w-full flex items-center">
          <IconButton type="submit" className="!p-0">
            <LocationOnIcon className="text-[#489742] " />
          </IconButton>
          <input
            placeholder="Search for a locality or a landmark"
            onChange={(e) => setQuery(e.target.value)}
            className=" text-gray-400 placeholder:text-[#cbcaca]  outline-none w-full"
          />
        </div>
        {hidden && (
          <button onClick={handleShow} className="vertical-text">
            search
          </button>
        )}
      </form>
      <div className="absolute top-12  shadow-black/30 shadow rounded-lg bg-white ">
        <ul className="max-h-[300px] overflow-scroll">
          {locations.map((x) => (
            <li
              className="flex items-center space-x-2 mb-4 cursor-pointer hover:bg-gray-100 p-2"
              onClick={() => setStartPoint({ lat: x.lat, lon: x.lon })}>
              <p>{x.display_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
