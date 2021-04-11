import React from "react";
import MonthlyGraph from "../graphs/MonthlyGraph";
import WeeklyGraph from "../graphs/WeeklyGraphs";
import YearlyGraph from "../graphs/YearlyGraphs";
import DangerIndex from "../graphs/DangerIndex";

import AverageCard from "./AverageNumber/AverageCard";
import { Card } from "semantic-ui-react";
export default class Widgets extends React.Component {
  render() {
    return (
      <React.Fragment style={{ overflowY: "auto" }}>
        <Card style={{ maxHeight: "5000px", marginLeft: "45px" }}>
          <DangerIndex />
        </Card>
        <Card style={{ marginLeft: "45px" }}>
          <AverageCard />
        </Card>
        <Card style={{ marginLeft: "45px" }}>
          <WeeklyGraph />
        </Card>
        <Card style={{ marginLeft: "45px" }}>
          <MonthlyGraph />
        </Card>
        <Card style={{ marginLeft: "45px" }}>
          <YearlyGraph />
        </Card>
      </React.Fragment>
    );
  }
}
