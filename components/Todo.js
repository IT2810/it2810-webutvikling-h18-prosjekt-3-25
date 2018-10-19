import React from 'react';
import { StyleSheet, FlatList, View, AsyncStorage, ScrollView} from 'react-native';
import {Button, Text, CheckBox, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

export default class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: "",
      errorMessage: "",
    }
  }

  static navigationOptions = {
    title: 'Todo',
  };

  //Downloads previously created tasks upon entering the page
  componentDidMount = async () => {
    let oldTasks = "";
    try {
      oldTasks = await AsyncStorage.getItem('taskArray') || 'none';
    } catch (error) {
      console.log(error.message);
    }
    if (oldTasks !== 'none') {
      oldTasks = JSON.parse(oldTasks);
      this.setState({tasks: oldTasks});
    }
  }

  //Adds a task and
  addTask = async () => {
    let input = this.state.text.trim();
    let index = this.taskIndex(input);
    if (input.length > 0 && index === -1) {
      //Clears the FormInput
      this.setState({text: ""});
      //Resets errormessage
      this.setState({errorMessage: ""})
      //Saves to AsyncStorage
      let value = [{key: input}].concat(this.state.tasks);
      value = JSON.stringify(value);
      try {
        await AsyncStorage.setItem('taskArray', value);
      } catch (error) {
        console.log(error.message);
      }
      this.setState(
        prevState => {
          return {
            tasks: [{key: input}].concat(prevState.tasks),
            text: "",
          };
        }
      )

    }
    else if (input.length > 0){
      this.setState({errorMessage: "An identical task already exists"})
      this.formInput.shake();
    }
    else {
      this.setState({errorMessage: "A task can't be empty"})
      this.formInput.shake();
    }
  }

  deleteTask = async (name) => {
      let copyState = this.state.tasks;
      let index = this.taskIndex(name);

      if (index >= 0) {
        copyState.splice(index, 1);
        //Updates AsyncStorage
        value = JSON.stringify(copyState);
        try {
          await AsyncStorage.setItem('taskArray', value);
        } catch (error) {
          console.log(error.message);
        }
        this.setState({tasks: copyState});
      }
  }
  //Helper method to decide if an identical task exists
  taskIndex = (taskName) => {
    let copyState = this.state.tasks;
    for (let i = 0; i < copyState.length; i++) {
      if (copyState[i].key === taskName) {
        return i;
      }
    }
    return -1;
  }

  //Helper method for rendering ChechBoxes
  renderCheckBoxes = () => {
    if (this.state.tasks.length > 0) {
      return (
        <FlatList
          data = {this.state.tasks}
          renderItem = {({item}) =>
            <CheckBox
              title={item.key}
              onPress={() => this.deleteTask(item.key)}
            />
          }
        />
      );
    }
    else {
      return (<Text style={styles.noTasks}>No Tasks</Text>);
    }
  }

  render () {
    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
      >
        <FormLabel>Task name</FormLabel>
        <FormInput
          ref={ref => this.formInput = ref}
          onChangeText={(input) => this.setState({text: input})}
          placeholder="Enter a task..."
          value={this.state.text}
          onSubmitEditing={this.addTask}
        />
        <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>
        <Button title="Ok" onPress={this.addTask} buttonStyle={styles.butt} />
        {this.renderCheckBoxes()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  butt: {
    backgroundColor: '#4286f4'
  },
  noTasks: {
    alignSelf: 'center',
    marginTop: '10%',
    fontSize: 16
  }
});
