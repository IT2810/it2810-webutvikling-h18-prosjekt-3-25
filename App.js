import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-elements';
//Imports for navigation
import ContactScreen from './components/Contact/ContactScreen.js';
import ContactListScreen from './components/ContactList/ContactListScreen.js';
import CreateContactScreen from './components/Contact/CreateContactScreen.js';
import AppointmentListScreen from './components/Appointments/AppointmentListScreen.js';
import AppointmentScreen from './components/Appointments/AppointmentScreen.js';
import CreateAppointmentScreen from './components/Appointments/CreateAppointmentScreen.js';
import TodoScreen from './components/Todo.js';
import StepCounter from './components/StepCounter.js';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  //Sets the title for HomeScreen
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1>PIMM</Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Appointments"
            onPress={() => this.props.navigation.navigate('AppointmentList')}
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Todo"
            onPress={() => this.props.navigation.navigate('Todo')}
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Step Counter"
            onPress={() => this.props.navigation.navigate('Skritteller')}
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Contacts"
            onPress={() => this.props.navigation.navigate('ContactList')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  butt: {
    backgroundColor: '#4286f4',
    width: '100%',
    marginTop: 10,
  },
});


const RootStack = createStackNavigator(
  //Defines how to reach each "page" using navigation.navigate
  {
    Home: HomeScreen,
    Todo: TodoScreen,
    Skritteller: StepCounter,
    ContactList: ContactListScreen,
    CreateContact: CreateContactScreen,
    Contact: ContactScreen,
    AppointmentList: AppointmentListScreen,
    CreateAppointment: CreateAppointmentScreen,
    Appointment: AppointmentScreen,
  },
  {
    //Sets the "root" page for navigation
    initialRouteName: 'Home',
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

//Exports the rootstack/stackNavigator
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
