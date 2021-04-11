import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { uf_coords, mapContainerStyle } from "../../assets/map_info";
import { mapPathEndpoints } from "./Map.d";

interface mapProps extends mapPathEndpoints {
  selectedPathIndex: number;
  setPolypaths: React.Dispatch<React.SetStateAction<google.maps.LatLng[][]>>;
  origin: string;
  destination: string;
}

const Map = (props: mapProps) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();

  const onDirectionsReceived = useCallback(
    (res: google.maps.DirectionsResult) => {
      setDirections(res);
      props.setPolypaths(res.routes.map((e) => e.overview_path));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const directionsServiceOptions: google.maps.DirectionsRequest = useMemo(
    () => ({
      origin: props.origin,
      destination: props.destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }),
    [props.origin, props.destination]
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={uf_coords}
      zoom={15}
    >
      {props.origin !== "" && props.destination !== "" && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={onDirectionsReceived}
        />
      )}
      {directions !== undefined &&
        directions.routes.map((_, i) => (
          <DirectionsRenderer
            key={i}
            directions={directions}
            routeIndex={i}
            options={{
              polylineOptions: {
                strokeColor:
                  props.selectedPathIndex === i
                    ? "rgb(16, 108, 179)"
                    : "rgba(83, 169, 235, 0.7)",
                strokeWeight: props.selectedPathIndex === i ? 10 : 5,
              },
            }}
          />
        ))}
    </GoogleMap>
  );
};

export default React.memo(Map);
