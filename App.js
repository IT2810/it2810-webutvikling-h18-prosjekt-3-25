import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContactScreen from './components/Contact/ContactScreen.js';
import ContactListScreen from './components/ContactList/ContactListScreen.js';
import CreateContactScreen from './components/Contact/CreateContactScreen.js';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
  {
    ContactList: ContactListScreen,
    CreateContact: CreateContactScreen,
    Contact: ContactScreen,
  },
  {
    initialRouteName: 'ContactList',
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
      // <View style={styles.container}>
      //   <ContactList />
      // </View>
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
