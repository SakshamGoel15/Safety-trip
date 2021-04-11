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
// labels: ['1', '2', '3',
//          '4'],
// datasets: [
//   {
//     label: '',
//       borderSkipped: 'left',
//     backgroundColor: '#1A73E8',
//     borderColor: '#36404D',
//     borderWidth: 2,
//      barPercentage: 0.5,
//     hoverBackgroundColor: '#75D9FD',
//     hoverBorderColor: '#75D9FD',
//     data: [650, 590, 810, 890]
//   }
// ]

export default class DangerGraph extends React.Component {
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
                text: "Danger Index",
                fontSize: 14,
                color: "#000000",
              },

              // legend: {
              //             labels: {
              //               fontSize: 25,
              //               fontColor:"#000000"
              //             },
              //           },

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
                      labelString: "Hundreds of Accidents",
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
  }
}

// import React from 'react'
// import { Doughnut, defaults } from 'react-chartjs-2'

// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

// const DangerGraph = () => {
//   return (
//     <div>
//       <Doughnut
//         data={{
//           labels: ["No Danger","Low Danger","Dangerous","Very Dangerous"],
//           datasets: [
//             {
//               label: ["No Danger","Low Danger","Dangerous","Very Dangerous"],
//               data: [194, 230, 330, 450],
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//               ],
//               borderWidth: 1,

//             hoverBackgroundColor: ['#75D9FD','#75D9FD','#75D9FD','#75D9FD'],
//             hoverBorderColor: ['#75D9FD','#75D9FD','#75D9FD','#75D9FD'],
//             hoverOffset: 4,
//             hoverBorderWidth:"10px",
//           },
//           ],

//         }}
//         height={400}
//         width={300}
//         options={{
//           maintainAspectRatio: false,
//           title:{
//             display:true,
//             text:'DANGER INDEX',
//             fontSize:14,
//             color: '#000000',
//           },
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   display: false,
//                   beginAtZero: true,
//                 },
//                 gridLines:{
//                   display:false,
//                 }
//               },
//             ],
//             xAxes:[{
//               ticks: {
//                 display: false,
//                 beginAtZero: true,
//               },

//                 gridLines:{
//                   display:false,
//                 }
//               }
//             ]
//           },
//           legend: {
//             datasetslabel: {
//               fontSize: 25,
//             },
//           },
//         }}
//       />
//     </div>
//   )
// }

// export default DangerGraph
