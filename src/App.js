import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Provider from "./pages/Provider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/provider" element={<Provider />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
