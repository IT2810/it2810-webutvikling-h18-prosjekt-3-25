import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-elements';
import ContactScreen from './components/Contact/ContactScreen.js';
import ContactListScreen from './components/ContactList/ContactListScreen.js';
import CreateContactScreen from './components/Contact/CreateContactScreen.js';
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
            title="Avtaler"
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
            title="Skritteller"
            onPress={() => this.props.navigation.navigate('Skritteller')}
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Kontakter"
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
    backgroundColor: '#fff',
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
  {
    Home: HomeScreen,
    Todo: TodoScreen,
    Skritteller: StepCounter,
    ContactList: ContactListScreen,
    CreateContact: CreateContactScreen,
    Contact: ContactScreen,
  },
  {
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

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
