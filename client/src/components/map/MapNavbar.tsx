import React, { useState, useCallback, useMemo, useRef } from "react";
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
          <input type="text" id="origin_input" ref={originRef} />
        </div>
        <div className="mapnavbar-row">
          <label htmlFor="destination_input">To: </label>
          <input type="text" id="destination_input" ref={destinationRef} />
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
          {props.queryStatus === "success"
            ? "here" //props.pathsData
            : props.queryStatus}
        </main>
      )}
    </div>
  );
};

export default MapNavbar;
