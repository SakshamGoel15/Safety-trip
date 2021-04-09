import React, { useState, useCallback, useMemo, useRef } from "react";
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
          <input type="text" id="origin_input" ref={originRef} />
        </div>
        <div className="mapnavbar-row">
          <label htmlFor="destination_input">To: </label>
          <input type="text" id="destination_input" ref={destinationRef} />
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
      {showBody && <main className="mapnavbar-main-body">Hello World</main>}
    </div>
  );
};

export default MapNavbar;
