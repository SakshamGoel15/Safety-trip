import axios from "axios";
import { QueryClient } from "react-query";
import { mapPathEndpoints } from "./components/map/Map.d";

export const queryClient = new QueryClient();

export interface ProcessedPathData {
  recent_accidents: {
    avg_weekly: number;
    avg_monthly: number;
    avg_yearly: number;
  };
  danger_index: number;
  distribution_weekly: number[];
  distribution_monthly: number[];
  distribution_yearly: number[];
}

export const fetchAccidentsData = async (polypaths: google.maps.LatLng[][]) => {
  const url = "http://localhost:8080/process";

  if (polypaths.length === 0) return [];

  const res = await axios.post<ProcessedPathData[]>(url, {
    polypaths: polypaths,
  });

  console.log(res);

  console.log(res.data);
  return res.data;
};

export const fetchTableSize = async () => {
  const url = "http://localhost:8080/table-size";
  const { data } = await axios.get(url);
  return data;
};