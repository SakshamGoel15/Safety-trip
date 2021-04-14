import React from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Button } from "semantic-ui-react";
import Link from "../Router/Link";

const computeDangerIndex = (danger_dist) => {
  const sum = danger_dist.reduce((acc, curr) => acc + curr);

  return Math.floor(sum / danger_dist.length) - 1;
};

const Severity = (danger_dist) => {
  return 25 + 50 * computeDangerIndex(danger_dist);
};

const DangerIndex = (props) => {
  return (
    <div>
      <div>
        <ReactSpeedometer
          width={290}
          height={190}
          needleHeightRatio={0.5}
          value={Severity(props.danger_dist)}
          maxValue={200}
          segments={4}
          currentValueText="Danger Index"
          textColor="#000000"
          customSegmentLabels={[
            {
              text: "No Danger",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Low Danger",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Dangerous",
              position: "INSIDE",
              color: "#555",
            },
            {
              text: "Very Dangerous",
              position: "INSIDE",
              color: "#555",
            },
          ]}
          ringWidth={57}
          needleTransitionDuration={3333}
          needleTransition="easeElastic"
          needleColor={"#1A73E8"}
          //   textColor={'#d8dee9'}
          //   valueTextFontSize={50}
          labelFontSize={"10px"}
        />
      </div>
      {/* <div>
        <Button
          style={{
            color: "blue",
            backgroundColor: "white",
            textAlign: "end",
            width: "280px",
          }}
        >
          <Link href="/DangerIndex">Click here for more</Link>
        </Button>
      </div> */}
    </div>
  );
};

export default DangerIndex;
