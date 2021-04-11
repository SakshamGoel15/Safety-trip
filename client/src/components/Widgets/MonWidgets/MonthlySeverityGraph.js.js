import React from "react";
import "semantic-ui-css/semantic.min.css";
/* use chart.js library for generating the graphs*/
import { Bar } from "react-chartjs-2";

const state = {
  /*labele represent the data on the x-axis*/
  labels: ["1", "2", "3", "4"],
  datasets: [
    {
      label: "NO OF ACCIDENT",
      borderSkipped: "left",
      backgroundColor: "#1A73E8",
      borderColor: "#36404D",
      borderWidth: 2,
      barPercentage: 0.5,
      hoverBackgroundColor: "#75D9FD",
      hoverBorderColor: "#75D9FD",
      data: [65, 59, 80, 81],
    },
  ],
};
export default class MonthlySeverity extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Bar
            data={state}
            width={290}
            height={250}
            options={{
              layout: {
                padding: {
                  left: 5,
                  right: 15,
                  top: 10,
                  bottom: 0,
                },
              },
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Accident severity (Monthly):",
                fontSize: 14,
                color: "#000000",
              },
              legend: {
                display: "false",
                position: "top",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoskip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}
