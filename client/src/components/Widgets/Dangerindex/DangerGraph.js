import React from "react";
import "semantic-ui-css/semantic.min.css";
/* use chart.js library for generating the graphs*/
import { Bar } from "react-chartjs-2";

const state = {
  /*labele represent the data on the x-axis*/
  labels: ["1", "2", "3", "4"],
  datasets: [
    {
      label: ["Danger Index"],
      data: [194, 230, 330, 450],
      backgroundColor: "#1A73E8",
      borderColor: "#36404D",
      borderWidth: 1,

      hoverBackgroundColor: ["#75D9FD", "#75D9FD", "#75D9FD", "#75D9FD"],
      hoverBorderColor: ["#75D9FD", "#75D9FD", "#75D9FD", "#75D9FD"],
      hoverOffset: 4,
      hoverBorderWidth: "10px",
    },
  ],
};

const DangerGraph = () => {
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
              text: "Danger Index",
              fontSize: 14,
              color: "#000000",
            },

            scales: {
              yAxes: [
                {
                  ticks: {
                    autoskip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Number of Accidents",
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Severity",
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default DangerGraph;
