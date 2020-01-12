import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Paper} from '@material-ui/core';

export default class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Network Graph',
          data: [0.5, 0.28, 0.33, 0.5789, 0.7, 0.799, 0.6, 1],
        },
      ],
      options: {
        chart: {
          height: '5vh',
          type: 'line',
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 4,
          curve: 'straight',
        },
        grid: {
          row: {
            colors: ['transparent'], // takes an array which will be repeated on columns
            opacity: 1,
          },
          borderColor: '#000',
          strokeDashArray: 0,
          show: false,
        },
        xaxis: {
          axisBorder: {
            show: true,
            color: '#000',
            height: 1,
            width: '200%',
            offsetX: 0,
            offsetY: -1.5,
          },
          xaxis: {
            type: 'datetime',
            min: new Date().getTime(),
            tickAmount: 6,
          },
        },
        tooltip: {
          x: {
            format: 'dd MMM yyyy',
          },
        },
        yaxis: {
          tickAmount: 4,
          min: 0,
          max: 1,
          axisBorder: {
            show: true,
            color: '#000',
            height: 1,
            width: '0.25%',
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
    };
  }

  render() {
    return (
      <Paper
        style={{
          background: '#d5dceb',
          padding: '.05vw',
          marginRight: '2vw',
          marginLeft: '2vw',
          marginBottom: '2vw',
        }}
        elevation={5}
      >
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='area'
          height="200"
        />
      </Paper>
    );
  }
}
