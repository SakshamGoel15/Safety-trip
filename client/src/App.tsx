import React, { useState } from "react";
// import Graph from "@components/graphs/graph";
// import Calendar from "./components/calendars/Calendar";
import MapNavbar from "./components/map/MapNavbar";
import Map from "./components/map/Map";
import "./App.css";
import { mapPathEndpoints } from "./components/map/Map.d";

function App() {
  const [shownPath, setShownPath] = useState(0);
  const [searchedEndpoints, setSearchedEndpoints] = useState<mapPathEndpoints>({
    origin: null,
    destination: null,
  });
  const [paths, setPaths] = useState<any[]>(["a", "b", "c"]);

  return (
    <div className="app-container">
      <MapNavbar
        onSearch={setSearchedEndpoints}
        selectedPath={shownPath}
        setSelectedPath={setShownPath}
        paths={paths}
      />
      <Map {...searchedEndpoints} highlightedPathIndex={shownPath} />
    </div>
  );
}

export default React.memo(App);
