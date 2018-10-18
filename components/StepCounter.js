import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Pedometer } from "expo";
import {Button, Text, Slider} from 'react-native-elements';

export default class StepCounter extends React.Component {

  static navigationOptions = {
    title: 'Step Counter',
  };
  //Skjelett-koden for å få skrittelleren til å fungere er hentet fra:
  //https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  //Og er kun modifisert i noen grad for vår bruk
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
    };
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //Starts communication with the built in pedometer
  _subscribe = () => {
    //Counts steps in real time and updates currentStepCount
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });
    //Checks if the app can reach the built in pedometer
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        console.log(error);
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );
    //Extracts steps counted the last 24 hours and saves it to pastStepCount
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        console.log(error);
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  //Ends communication with the pedometer
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  //Helper method for transforming steps into a rating between 0 and 5
  stepsToRating = () => {
    let rating = (this.state.pastStepCount+this.state.currentStepCount)/2000;
    if (rating > 5) {
      return 5;
    }
    else if (rating > 0) {
      return rating;
    }
  }

  //Helper method for displaying daily step stepCount or potential error message
  getText = () => {
    if (this.state.pastStepCount === 0) {
      return "Can't reach the pedometer, please refresh the page";
    }
    else {
      let steps = this.state.pastStepCount + this.state.currentStepCount;
      return "Steg de siste 24 timene: " + steps;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h3 style={styles.text}>Dagens mål:</Text>
        <Slider
          style={styles.slider}
          value={this.stepsToRating()}
          maximumValue={5}
          disabled
        />
        <Text style={styles.text}>{this.getText()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  slider: {
    width: '80%',
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center'
  }
});
