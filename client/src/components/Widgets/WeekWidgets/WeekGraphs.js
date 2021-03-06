import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
/* use chart.js library for generating the graphs*/
import { Bar } from "react-chartjs-2";

const WeekGraph = () => {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    /*labele represent the data on the x-axis*/
    setChartData({
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
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <div>
        <header></header>
      </div>
      <div>
        <Bar
          data={chartData}
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
                  // gridLines:{
                  //   display:false,
                  // }
                },
              ],
              // xAxes:[
              //   {

              //     gridLines:{
              //       display:false,
              //     }
              //   }
              // ]
            },
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default WeekGraph;

// import React from 'react';
// import 'semantic-ui-css/semantic.min.css'
// /* use chart.js library for generating the graphs*/
// import { Chart , Bar } from 'react-chartjs-2';
// import {  Button } from 'semantic-ui-react'
// import { IoIosArrowDropleftCircle,IoIosArrowDroprightCircle } from "react-icons/io";

// const state = {
//     /*labele represent the data on the x-axis*/
//   labels: ['SUN', 'MON', 'TUE',
//            'WED', 'THR', 'FRI', 'SAT'],
//   datasets: [
//     {
//       label: 'NO OF ACCIDENT',
//         borderSkipped: 'left',
//       backgroundColor: '#1A73E8',
//       borderColor: '#36404D',
//       borderWidth: 2,
//        barPercentage: 0.9,
//       hoverBackgroundColor: '#75D9FD',
//       hoverBorderColor: '#75D9FD',
//       data: [75, 59, 18, 67, 76, 95, 66]
//     }
//   ]
// }

// export default class WeekGraph extends React.Component {
//   render() {
//     return (
//       <div>
//         <div>
//           <header>
//           </header>
//         </div>
//       <div>
//         <Bar
//           data={state}
//           width={290}
//           height={250}
//           options={{
//             layout: {
//                 padding: {
//                     left: 5,
//                     right: 15,
//                     top: 10,
//                     bottom: 0
//                 }
//             },
//             maintainAspectRatio: false,
//             title:{
//               display:true,
//               text:'WEEKLY TRENDS',
//               fontSize:14,
//               color: '#000000',
//             },
//             legend:{
//               display:"false",
//               position:'top',
//             },

//           }}
//         />

//       </div>
//       <div>
//            <Button style={{color: "blue", backgroundColor:"white", paddingLeft:"65px",paddingTop:"0", fontSize:"40px", textAlign:'start', width: "100px",height:"0px" }}><IoIosArrowDropleftCircle/></Button>
//            <Button style={{color: "blue", backgroundColor:"white", paddingLeft:"65px",paddingTop:"0", fontSize:"40px", textAlign:'start', width: "100px",height:"0px"}}><IoIosArrowDroprightCircle/></Button>

//       </div>
//       </div>
//     );
//   }
// }
