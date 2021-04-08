import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { uf_coords, mapContainerStyle } from "../../assets/map_info";
import { mapPathEndpoints } from "./Map.d";

interface mapProps extends mapPathEndpoints {
  highlightedPathIndex?: number;
}

const Map = (props: mapProps) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = useCallback(
    (res: any) => {
      console.log(res);

      if (res !== null) {
        if (res.status === "OK") {
          setResponse(res);
        } else {
          console.log("ERROR in Request: ", res);
        }
      }
    },
    [setResponse]
  );

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={uf_coords}
        zoom={15}
      >
        {props.origin !== "" && props.destination !== "" && (
          <DirectionsService
            options={{
              origin: props.origin,
              destination: props.destination,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
          />
        )}

        {response !== null && (
          <DirectionsRenderer
            options={{ directions: response }}
            routeIndex={props.highlightedPathIndex || 0}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
