import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState();
  const [userRefusal, setUserRefusal] = useState();

  useEffect(() => {
    window.ReactNativeWebView.postMessage("hello world from directions api");
  });
  return (
    <div className="App">
      <Map
        location={location}
        setLocation={setLocation}
        setUserRefusal={setUserRefusal}
      />
    </div>
  );
}

export default App;
