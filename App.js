import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import Appointment from './components/Appointment.js';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Appointment 
					header="jobbintervju"
					date="2018-10-10"
					description="Jobbintervju hos zedge, blir sykt fet ass">
				</Appointment>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
