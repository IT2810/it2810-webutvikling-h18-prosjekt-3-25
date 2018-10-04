import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Contact from './components/Contact/Contact.js';
import ContactList from './components/ContactList/ContactList.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ContactList />
      </View>
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
