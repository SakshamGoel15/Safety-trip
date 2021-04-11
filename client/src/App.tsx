import React, { useState } from "react";
import { QueryFunctionContext, useQuery } from "react-query";
// import Graph from "@components/graphs/graph";
// import Calendar from "./components/calendars/Calendar";
import MapNavbar from "./components/map/MapNavbar";
import Map from "./components/map/Map";
import { fetchAccidentsData } from "./queries";
import "./App.css";
import { mapPathEndpoints } from "./components/map/Map.d";

const accidentsDataQuery = (
  context: QueryFunctionContext<(string | google.maps.LatLng[][])[], any>
) => fetchAccidentsData(context.queryKey[1] as google.maps.LatLng[][]);

function App() {
  const [selectedPath, setSelectedPath] = useState(0);
  const [searchedEndpoints, setSearchedEndpoints] = useState<mapPathEndpoints>({
    origin: "",
    destination: "",
  });
  const [polypaths, setPolypaths] = useState<google.maps.LatLng[][]>([]);

  const { data, status } = useQuery(
    ["processed_paths_data", polypaths],
    accidentsDataQuery
  );

  return (
    <div className="app-container">
      <MapNavbar
        onSearch={setSearchedEndpoints}
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        pathsData={data}
        queryStatus={status}
      />
      <Map
        selectedPathIndex={selectedPath}
        setPolypaths={setPolypaths}
        {...searchedEndpoints}
      />
    </div>
  );
}

export default React.memo(App);
