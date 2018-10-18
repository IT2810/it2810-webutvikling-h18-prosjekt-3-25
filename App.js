import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppointmentListScreen from './components/Appointments/AppointmentListScreen.js';
import AppointmentScreen from './components/Appointments/AppointmentScreen.js';
import CreateAppointmentScreen from './components/Appointments/CreateAppointmentScreen.js';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    AppointmentList: AppointmentListScreen,
    CreateAppointment: CreateAppointmentScreen,
    Appointment: AppointmentScreen,
  },
  {
    initialRouteName: 'AppointmentList',
    //Styling for all headers unless overridden
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#4286f4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


export default class App extends React.Component {
  render() {
    return (
    	//Rootstack for "scener"
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
});
