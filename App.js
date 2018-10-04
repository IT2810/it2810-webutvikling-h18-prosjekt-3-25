import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h1>PIMM</Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.butt}
            containerStyle={{height: 1000}}
            large
            rounded
            title="Avtaler"
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Skritteller"
          />
          <Button
            buttonStyle={styles.butt}
            large
            rounded
            title="Kontakter"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
