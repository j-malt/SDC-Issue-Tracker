import React from 'react';

import './App.css';
import { Grid, Paper, Typography } from '@material-ui/core'

import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'
import NetworkGraph from './components/NetworkGraph';
import TweetStream from './components/TweetStream';
var chartState = {

	options: {
		chart: {
         id: 'realtime',
			height: 450,
			type: "line",
			zoom: {
				enabled: false
			},
			animations: {
				enabled: true,
				easing: "linear",
				dynamicAnimation: {
					speed: 500
				}
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 4,
			curve: "smooth"
		},
		grid: {
			row: {
				colors: ["transparent"], // takes an array which will be repeated on columns
				opacity: 1
			},
			borderColor: "#000",
			strokeDashArray: 0,
			show: false
		},
		xaxis: {
			axisBorder: {
				show: true,
				color: "#000",
				height: 1,
				width: "200%",
				offsetX: 0,
				offsetY: -1.5
			},
			xaxis: {
				type: "datetime",
				min: new Date().getTime(),
				tickAmount: 6
			}
		},
		tooltip: {
			x: {
				format: "dd MMM yyyy"
			}
		},
		yaxis: {
			tickAmount: 4,
			min: -1,
			max: 1,
			axisBorder: {
				show: true,
				color: "#000",
				height: 1,
				width: "0.25%",
				offsetX: 0,
				offsetY: 0
			}
		}
	}
}
function fetchData() {
	return fetch("http://127.0.0.1:5000/", {
		method: "GET",
		mode: "cors",
		dataType: "json"
	}).then(response => {
		if (!response.ok) {
			throw new Error("HTTP Status" + response.status);
		}
		return response.json();
	});
}

function buildTweets(dict) {
   let tweets = []
   for(var idx in dict) {
      var twt = []
      var tweet = dict[idx]
      twt.push(tweet["name"]);
      twt.push(tweet["text"]);
      twt.push(tweet["technical"]);
      twt.push(tweets);
      tweets.push(twt)
   }
   return tweets
}

function averageSentiment(dict) {
   let sum = 0
   let count = 0
   for(var idx in dict) {
      sum += dict[idx]['sentiment']
      count += 1
   }
   return sum / count
}

export default class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         tweets: [[], [], []],
         series: [{
            data: [0.6, 1, -.2, -.5, 0.1, .7],
         }],
         siteStatus: [100, 100, 100, 100, 99, 100, 96]
      }
   } 
   componentDidMount() {
		setInterval(() => ( 
         fetchData().then((data) => {
            var newSentiData = this.state.series[0]['data'];
            this.state.series[0]['data'].push(averageSentiment(data))
            var newSiteStatus = this.state.siteStatus
            newSiteStatus.push(Math.random(95, 100));
                        
            this.setState({
               tweets: buildTweets(data),
               series: [{
                  name: 'Sentimental',
                  data: newSentiData
               }],
               siteStatus: newSiteStatus
            });
            ApexCharts.exec("realtime", "updateSeries", [
               {
                  data: newSentiData
               }
            ]);
         }
      )), 5000)
   }
   
   render() {
      return (
				<div className="App">
					<header className="App-header">
						<Typography
							align="center"
							style={{
								fontWeight: 700,
								fontFamily: "Montserrat",
								paddingBottom: "1vh",
								fontSize: "1.5em",
								margin: "none"
							}}
						>
							Social Media Issue Tracker
						</Typography>
						<Grid
							container
							spacing={8}
							direction="row"
							justify="center"
							alignItems="flex-start"
						>
							<Grid style={{ marginBottom: "5vh" }} item xs={4}>
								<Paper
									style={{
										color: "white",
										background: "#717e99",
										height: "45vh"
									}}
									elevation={10}
								>
									<Typography style={{ fontFamily: "Montserrat" }}>
										Tweet Stream
									</Typography>
									{/*0 status means technical issue, 1 means non-technical}*/}
									<TweetStream tweets={this.state.tweets} />
								</Paper>
							</Grid>
							<Grid item xs={8}>
								<Paper
									style={{
										color: "white",
										background: "#717e99",
										height: "45vh"
									}}
									elevation={10}
								>
									<Typography style={{ fontFamily: "Montserrat" }}>
										Sentiment Analysis Graph
									</Typography>
									{/*
									<SentimentGraph series={this.state.series} />*/}
									<Paper
										style={{
											background: "#d5dceb",
											padding: ".05vw",
											marginRight: "2vw",
											marginLeft: "2vw",
											marginBottom: "2vw"
										}}
										elevation={5}
									>
                              {console.log(this.state.series)}
										<ReactApexChart
											options={chartState.options}
											series={this.state.series}
											type="area"
											height={350}
										/>
									</Paper>
								</Paper>
							</Grid>
						</Grid>

						<Grid
							container
							spacing={8}
							direction="row"
							justify="center"
							alignItems="flex-start"
						>
							<Grid item xs={4}>
								<Paper
									style={{
										color: "white",
										background: "#717e99",
										height: "30vh"
									}}
									elevation={10}
								>
									<Typography style={{ fontFamily: "Montserrat" }}>
										Average Sentiment
									</Typography>
									<Paper
										style={{
											background: "#d5dceb",
											padding: "2vw",
											margin: "2vw"
										}}
										elevation={5}
									>
										<Typography
											align="center"
											style={{ fontSize: "2.5em", fontFamily: "Montserrat" }}
										>
											{this.state.series[0]["data"].reverse()[0].toFixed(5)}
										</Typography>
									</Paper>
								</Paper>
							</Grid>
							<Grid item xs={8}>
								<Paper
									style={{
										color: "white",
										background: "#717e99",
										height: "30vh"
									}}
									elevation={10}
								>
									<Typography style={{ fontFamily: "Montserrat" }}>
										SCD Network Status Graph
									</Typography>
									<NetworkGraph />
								</Paper>
							</Grid>
						</Grid>
					</header>
				</div>
			);
   }
}
