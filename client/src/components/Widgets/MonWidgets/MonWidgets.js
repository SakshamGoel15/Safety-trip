import React from "react";
import MonGraph from "./MonGraph";
// import WeeklyGraph from "../../graphs/WeeklyGraphs";
// import YearlyGraph from "../../graphs/YearlyGraphs";
import MonCalendar from "../../calendars/MonCalendar";
import MonthlySeverity from "./MonthlySeverityGraph.js.js";
import Link from "../../Router/Link";
import { Card } from "semantic-ui-react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default class MonWidgets extends React.Component {
  render() {
    return (
      <React.Fragment style={{ overflowY: "auto" }}>
        <div>
          <div>
            <div
              style={{
                color: "blue",
                backgroundColor: "white",
                paddingLeft: "6px",
                paddingTop: "0",
                fontSize: "30px",
                textAlign: "end",
                width: "0px",
                height: "0px",
              }}
            >
              <Link href="/">
                <IoIosArrowDropleftCircle />
                <div
                  style={{
                    color: "blue",
                    backgroundColor: "white",
                    paddingLeft: "0px",
                    paddingTop: "0",
                    fontSize: "15px",
                    textAlign: "start",
                    width: "30px",
                    height: "0px",
                  }}
                >
                  Back
                </div>
              </Link>
            </div>
          </div>
          <Card style={{ width: "300px", marginLeft: "50px" }}>
            <MonGraph />
          </Card>
        </div>
        <Card style={{ marginLeft: "50px" }}>
          <MonthlySeverity />
        </Card>
        {/* <Card>
          <MonCalendar />
        </Card> */}
      </React.Fragment>
    );
  }
}
