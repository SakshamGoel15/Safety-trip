import React, { useMemo } from "react";
import MonthlyGraph from "../graphs/MonthlyGraph";
import WeeklyGraph from "../graphs/WeeklyGraphs";
import YearlyGraph from "../graphs/YearlyGraphs";
import DangerIndex from "../graphs/DangerIndex";

import AverageCard from "./AverageNumber/AverageCard";
import { Card } from "semantic-ui-react";
import { ProcessedPathData } from "../../queries";

interface WidgetsProps {
  data: ProcessedPathData;
}

const Widgets = (props: WidgetsProps) => {
  return (
    <React.Fragment>
      <Card style={{ maxHeight: "5000px", marginLeft: "45px" }}>
        <DangerIndex danger_dist={props.data.severity_yearly} />
      </Card>
      <Card style={{ marginLeft: "45px" }}>
        <AverageCard {...props.data.recent_accidents} />
      </Card>
      <Card style={{ marginLeft: "45px" }}>
        <WeeklyGraph data={props.data.distribution_weekly} />
      </Card>
      <Card style={{ marginLeft: "45px" }}>
        <MonthlyGraph data={props.data.distribution_monthly} />
      </Card>
      <Card style={{ marginLeft: "45px" }}>
        <YearlyGraph data={props.data.distribution_yearly} />
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
