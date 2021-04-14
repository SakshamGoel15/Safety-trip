import React from "react";
import { fetchTableSize } from "../queries";
import { useQuery } from "react-query";
import "./TableSizeButton.css";

const TableSizeButton = () => {
  const { data, status } = useQuery(["table-size"], fetchTableSize);

  return (
    <div className="table-size-button">
      {status === "success"
        ? `Total number of compiled accidents: ${data.number_accidents} tuples`
        : status}
    </div>
  );
};

export default React.memo(TableSizeButton);
