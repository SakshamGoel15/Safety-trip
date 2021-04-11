import React from "react";
import { Card } from "semantic-ui-react";
export default class AverageCard extends React.Component {
  render() {
    return (
      <React.Fragment style={{ overflowY: "auto" }}>
        <Card style={{ marginLeft: "0px" }}>
          <div
            style={{
              margin: "10px",
              marginBottom: "0px",
              fontWeight: "bold",
              fontSize: "10",
            }}
          >
            Average Number of Accidents:
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
              style={{ maxWidth: "70px", height: "90px", marginTop: "14px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "coloumn",
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
                  flexDirection: "coloumn",
                  justifyContent: "center",
                  marginTop: "15px",
                  marginBottom: "0px",
                  fontWeight: "bold",
                  fontSize: "40px",
                }}
              >
                11
              </div>
            </Card>
            <Card style={{ maxWidth: "70px", height: "90px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "coloumn",
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
                  flexDirection: "coloumn",
                  justifyContent: "center",
                  marginTop: "15px",
                  marginBottom: "0px",
                  fontWeight: "bold",
                  fontSize: "40px",
                }}
              >
                12
              </div>
            </Card>
            <Card style={{ maxWidth: "70px", height: "90px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "coloumn",
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
                  flexDirection: "coloumn",
                  justifyContent: "center",
                  marginTop: "15px",
                  marginBottom: "0px",
                  fontWeight: "bold",
                  fontSize: "40px",
                }}
              >
                13
              </div>
            </Card>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}
