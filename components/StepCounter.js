import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Pedometer } from "expo";
import {Button, Text, Slider, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

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
      stepGoal: 10000,
      errorMessage: "",
      input: "",
    };
  }

  componentDidMount = async () => {
    this._subscribe();
    //Fetches eventual old daily stepgoal
    try {
      newStepGoal = await AsyncStorage.getItem('stepGoal') || 'none';
    } catch (error) {
      console.log(error.message);
    }
    if (newStepGoal !== 'none') {
      console.log(newStepGoal);
      newStepGoal = parseInt(newStepGoal);
      this.setState({stepGoal: newStepGoal});
    }
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

  //Helper method for transforming steps into a rating between 0 and 10
  stepsToRating = () => {
    let rating = (this.state.pastStepCount+this.state.currentStepCount)/this.state.stepGoal*10;
    if (rating > 10) {
      return 10;
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
      return "Steps taken last 24 hours: " + steps + "\n" + "Daily goal: " + this.state.stepGoal;
    }
  }

  //Updates the personal step goal
  setGoal = async () => {
    let newGoal = this.state.input.trim();
    newGoal = parseInt(newGoal);
    //Is it not a number or just empty?
    if (isNaN(newGoal) || newGoal.length < 1) {
      this.setState({errorMessage: "Please enter a number"})
      this.formInput.shake();
    }
    //It is a number
    else {
      //Clears the FormInput
      this.setState({input: ""});
      //Resets errormessage
      this.setState({errorMessage: ""})
      //Saves to AsyncStorage
      try {
        await AsyncStorage.setItem('stepGoal', newGoal.toString());
      } catch (error) {
        console.log(error.message);
      }
      this.setState({stepGoal: newGoal});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.margin}>
          <Text h3 style={styles.text}>Daily goal</Text>
          <Slider
            style={styles.slider}
            value={this.stepsToRating()}
            maximumValue={10}
            disabled
          />
          <Text style={styles.text}>{this.getText()}</Text>
        </View>
        <View style={styles.margin}>
          <FormLabel>Set daily goal</FormLabel>
          <FormInput
            ref={ref => this.formInput = ref}
            onChangeText={(text) => this.setState({input: text})}
            placeholder="Eg. 8000"
            value={this.state.input}
            onSubmitEditing={this.setGoal}
          />
          <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>
          <Button title="Ok" onPress={this.setGoal} buttonStyle={styles.butt} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  margin: {
    marginTop: '10%'
  },
  slider: {
    width: '80%',
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center'
  },
  butt: {
    backgroundColor: '#4286f4',
    width: '100%'
  }
});
