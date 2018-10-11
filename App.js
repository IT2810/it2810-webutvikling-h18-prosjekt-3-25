import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import TodoScreen from './Components/Todo.js';
import StepCounter from './Components/StepCounter.js';

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

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Todo: TodoScreen,
    Skritteller: StepCounter,
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
