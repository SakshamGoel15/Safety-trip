import React, { useState, useCallback, useRef } from "react";
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

  return (
    <div className="mapnavbar-container">
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
          {showBody ? <h3>Path #{props.selectedPath + 1}</h3> : <div />}
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
