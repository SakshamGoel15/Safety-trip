import React from "react";
import { Card } from "semantic-ui-react";

export interface AverageCardProps {
  avg_weekly: number;
  avg_monthly: number;
  avg_yearly: number;
}

const AverageCard = (props: AverageCardProps) => (
  <React.Fragment>
    <Card style={{ marginLeft: "0px" }}>
      <div
        style={{
          margin: "10px",
          marginBottom: "0px",
          fontWeight: "bold",
          fontSize: "10",
        }}
      >
        Average Number of Accidents (2020):
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "0px",
        }}
      >
        <Card
          style={{
            maxWidth: "70px",
            height: "90px",
            marginTop: "14px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "7px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "10",
            }}
          >
            Weekly
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            {props.avg_weekly}
          </div>
        </Card>
        <Card
          style={{ maxWidth: "70px", height: "90px", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "7px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "10",
            }}
          >
            Monthly
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            {props.avg_monthly}
          </div>
        </Card>
        <Card
          style={{ maxWidth: "70px", height: "90px", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "7px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "10",
            }}
          >
            Yearly
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            {props.avg_yearly}
          </div>
        </Card>
      </div>
    </Card>
  </React.Fragment>
);

export default AverageCard;
