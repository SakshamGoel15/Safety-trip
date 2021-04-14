import React, { useState, useCallback, useMemo, useRef } from "react";
import Widgets from "../Widgets/Widgets";
import WeekWidgets from "../Widgets/WeekWidgets/WeekWidgets";
import MonWidgets from "../Widgets/MonWidgets/MonWidgets";
import YearlyWidgets from "../Widgets/YearlyWidgets/YearlyWidgets";
import DangerIndex from "../Widgets/Dangerindex/DangerWidgets";
import Route from "../Router/Route";

import { ProcessedPathData } from "../../queries";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { QueryStatus } from "react-query";
import { mapPathEndpoints } from "./Map.d";
import "./MapNavbar.css";

interface mapNavbarProps {
  onSearch: React.Dispatch<React.SetStateAction<mapPathEndpoints>>;
  selectedPath: number;
  setSelectedPath: React.Dispatch<React.SetStateAction<number>>;
  pathsData: ProcessedPathData[] | undefined;
  queryStatus: QueryStatus;
}

const MapNavbar = (props: mapNavbarProps) => {
  const [showBody, setShowBody] = useState(false);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const onClickSearch = useCallback(() => {
    setShowBody(true);
    props.onSearch({
      origin: originRef.current?.value ?? "",
      destination: destinationRef.current?.value ?? "",
    });
  }, [setShowBody, props]);

  const pathNames = useMemo(() => {
    if (!props.pathsData) return [];
    return props.pathsData.map((_, i) => `Path #${i + 1}`);
  }, [props.pathsData]);

  return (
    <div className={`mapnavbar-container ${showBody ? "extend-navbar" : ""}`}>
      <header className="mapnavbar-header">
        <div className="mapnavbar-row">
          <label htmlFor="origin_input">From: </label>
          <input
            style={{ width: "300px" }}
            type="text"
            id="origin_input"
            ref={originRef}
          />
        </div>
        <div className="mapnavbar-row">
          <label htmlFor="destination_input">To: </label>
          <input
            style={{ width: "300px" }}
            type="text"
            id="destination_input"
            ref={destinationRef}
          />
        </div>
        <div className="mapnavbar-row">
          {props.pathsData && props.pathsData.length > 0 ? (
            <DropdownMenu
              items={pathNames}
              selectedIndex={props.selectedPath}
              setSelectedIndex={props.setSelectedPath}
            />
          ) : (
            <div />
          )}
          <button className="mapnavbar-search-button" onClick={onClickSearch}>
            Search
          </button>
        </div>
      </header>
      {showBody && (
        <main className="mapnavbar-main-body">
          {props.queryStatus !== "success" ||
          props.pathsData === undefined ||
          props.pathsData.length === 0 ? (
            props.queryStatus
          ) : (
            <div style={{ padding: "5px" }}>
              <Route path="/">
                <Widgets data={props.pathsData[props.selectedPath]} />
              </Route>
              <Route path="/DangerIndex">
                <DangerIndex />
              </Route>
              <Route path="/Month">
                <MonWidgets />
              </Route>
              <Route path="/Week">
                <WeekWidgets />
              </Route>
              <Route path="/Year">
                <YearlyWidgets />
              </Route>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default MapNavbar;
