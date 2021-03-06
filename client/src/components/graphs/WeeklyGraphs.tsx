import React from "react";
import "semantic-ui-css/semantic.min.css";
/* use chart.js library for generating the graphs*/
import { Bar } from "react-chartjs-2";
import { Button } from "semantic-ui-react";
import Link from "../Router/Link";

const state = {
  /*labele represent the data on the x-axis*/
  labels: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
  datasets: [
    {
      label: "NO OF ACCIDENT",
      borderSkipped: "left",
      backgroundColor: "#1A73E8",
      borderColor: "#36404D",
      borderWidth: 2,
      barPercentage: 0.9,
      hoverBackgroundColor: "#75D9FD",
      hoverBorderColor: "#75D9FD",
      data: [75, 59, 18, 67, 76, 95, 66],
    },
  ],
};

export interface GraphProps {
  data: number[];
}

const WeeklyGraph = (props: GraphProps) => {
  state.datasets[0].data = props.data;

  return (
    <div>
      <div>
        <header></header>
      </div>
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
              text: "WEEKLY TRENDS",
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
                  scaleLabel: {
                    display: true,
                    labelString: "Number of Accidents",
                  },
                },
              ],
            },
          }}
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
          <Link href="/Week" className="">
            Click here for more
          </Link>
        </Button>
      </div> */}
    </div>
  );
};

export default WeeklyGraph;
