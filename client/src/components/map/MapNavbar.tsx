import React, { useState, useCallback, useMemo, useRef } from "react";
import Widgets from "../Widgets/Widgets";
import WeekWidgets from "../Widgets/WeekWidgets/WeekWidgets";
import MonWidgets from "../Widgets/MonWidgets/MonWidgets";
import YearlyWidgets from "../Widgets/YearlyWidgets/YearlyWidgets";
import DangerIndex from "../Widgets/Dangerindex/DangerWidgets";
import Route from "../Router/Route";

import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./MapNavbar.css";

interface mapNavbarProps {
  onSearch: Function;
  selectedPath: number;
  setSelectedPath: Function;
  paths: any[];
}

const MapNavbar = (props: mapNavbarProps) => {
  const [showBody, setShowBody] = useState(false);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const onClickSearch = useCallback(() => {
    setShowBody(true);
    props.onSearch({
      origin: originRef.current?.value,
      destination: destinationRef.current?.value,
    });
  }, [setShowBody, props]);

  const pathNames = useMemo(() => props.paths.map((_, i) => `Path #${i + 1}`), [
    props.paths,
  ]);

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
          {showBody ? (
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
          <div>
            <Route path="/">
              <Widgets />
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
        </main>
      )}
    </div>
  );
};

export default MapNavbar;
