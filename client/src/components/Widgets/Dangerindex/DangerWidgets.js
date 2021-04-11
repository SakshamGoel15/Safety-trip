import React from "react";
import DangerGraph from "./DangerGraph";
import DangerIndex from "./DangerIndex";
import Link from "../../Router/Link";
import { Card } from "semantic-ui-react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
export default class DangerWidgets extends React.Component {
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
            <DangerIndex />
          </Card>
        </div>
        <Card style={{ marginLeft: "50px" }}>
          <DangerGraph />
        </Card>
      </React.Fragment>
    );
  }
}
