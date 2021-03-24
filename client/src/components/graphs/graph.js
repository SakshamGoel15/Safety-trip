import React from 'react';
/* use chart.js library for generating the graphs*/  
import {Bar} from 'react-chartjs-2';

const state = {
    /*labele represent the data on the x-axis*/
  labels: ['January', 'February', 'March',
           'April', 'May', 'June', 'July','August','september', 'october', 'November', 'December' ],
  datasets: [
    {
      label: 'ACCIDENT PER MONTH',
      borderSkipped: 'left',
      backgroundColor: '#1A73E8',
      borderColor: '#36404D',
      borderWidth: 2,
      barPercentage: 0.9,
      hoverBackgroundColor: '#75D9FD',
      hoverBorderColor: '#75D9FD',
      data: [65, 59, 80, 81, 56, 44, 66, 77, 125, 77, 91, 78]
    }
  ]
}
export default class Graph extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          width={900}     
          height={400}
          options={{
            layout: {
                padding: {
                    left: 50,
                    right: 500,
                    top: -10,
                    bottom: 0
                }
            },
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'MONTHLY TRENDS',
              fontSize:20,
              
              
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}