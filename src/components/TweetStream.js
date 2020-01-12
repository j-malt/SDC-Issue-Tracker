import React from 'react';
import {Grid, Paper, Typography, Hidden} from '@material-ui/core';

export default class TweetStream extends React.Component {
  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    if (!(this.props.user, prevProps.user)) {
    }
  }
  createTweets() {
    const tweets = [];
    console.log(this.props.tweets);
    for (const idx in this.props.tweets) {
      const tweet = this.props.tweets[idx];
      if (tweets.length >= 3) {
        tweets.shift();
      }
      tweets.push(
          <Tweet
            user={tweet[0]}
            tweet={tweet[1]}
            alertColor={tweet[2] === 0 ? '#d5dceb' : '#E82E2E'}
          />,
      );
    }

    return tweets;
  }
  render() {
    return (
      <Grid container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
        spacing={4}
      >

        {this.createTweets()}

      </Grid>
    );
  }
}

class Tweet extends React.Component {
  render() {
    return (
      <Grid
        style={{
          paddingLeft: '2vw',
          paddingRight: '2vw',
          textAlign: 'left',
          color: 'white',
        }}
        item
      >
        <Paper
          style={{
            backgroundImage:
              'linear-gradient(-135deg, ' + this.props.alertColor + ' , ' + this.props.alertColor + ' 20px, #d5dceb 20px, #d5dceb)',
            height: '10vh',
            padding: '.25vw',
            overflow: Hidden,
          }}
          elevation={5}
        >
          <Typography style={{fontFamily: 'Montserrat'}}>
            <b>{this.props.user}</b>
          </Typography>
          <Typography style={{fontFamily: 'Montserrat', fontSize: '.53em'}}>{this.props.tweet}</Typography>
        </Paper>
      </Grid>
    );
  }
}
