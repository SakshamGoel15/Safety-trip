import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { uf_coords, mapContainerStyle } from "../../assets/map_info";

const Map = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={uf_coords}
        zoom={10}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
