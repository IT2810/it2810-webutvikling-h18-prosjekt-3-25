import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
 
export default class AppointmentScreen extends React.Component {

	static navigationOptions = {
		title: "Appointment",
	}

	//viser valgt appointment med alle detaljer
	render() {
		return (
			<View style={styles.appointmentContainer}>
				<View style={styles.texts}>
					<View style={styles.headerView}>
						<Icon name="star" size={50}/>
						<Text style={styles.header}>{this.props.navigation.getParam("header")}</Text>
					</View>
					<View style={styles.infoLine}>
						<Icon name="event" size={30}/>
						<Text style={styles.text}>{this.props.navigation.getParam("date")}</Text>
					</View>
					<View style={styles.infoLine}>
						<Icon name="description" size={30}/>
						<Text style={styles.text}>{this.props.navigation.getParam("description")}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	appointmentContainer: {
		flex: 1,
	},

  texts: {
    flex: 2,
  },
	
	infoLine: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },

  text: {
    fontSize: 18,
    paddingBottom: 15,
    paddingTop: 30,
    paddingLeft: 20,
  },

	headerView: {
    flexDirection: 'row',
    paddingLeft: 10,
		borderBottomWidth: 1,
		borderBottomColor:'#87cefa',
  },
  header: {
  	fontSize: 30,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
  },
});