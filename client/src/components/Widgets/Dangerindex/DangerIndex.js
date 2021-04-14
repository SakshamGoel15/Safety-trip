import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const DangerIndex = () => {
  const Severity = () => {
    //Enter the No of accidents[0,1,2,3] according to severity{1,2,3,4}
    const Accident = [100, 2, 125, 3];
    // const Lagest_Value = Math.max(...Accident);
    const Value_For_ReactSpeedometer = [25, 75, 125, 175];
    const Index = Accident.indexOf(Math.max(...Accident));
    console.log("print", Index);
    if (Index === 0) {
      return Value_For_ReactSpeedometer[0];
    } else if (Index === 1) {
      return Value_For_ReactSpeedometer[1];
    } else if (Index === 2) {
      return Value_For_ReactSpeedometer[2];
    } else if (Index === 3) {
      return Value_For_ReactSpeedometer[3];
    }
  };
  return (
    <div>
      <div>
        <ReactSpeedometer
          width={290}
          height={190}
          needleHeightRatio={0.5}
          value={Severity()}
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
    </div>
  );
};

export default DangerIndex;
