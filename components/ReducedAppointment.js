import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Button } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default class ReducedAppointment extends React.Component {
	render() {
		return (
			//TouchableNativeFeedback gjør elementet trykkbart og lager effekten
			//man ser når man trykker på det
			<TouchableNativeFeedback onPress={this.props.onPress}>
				<View style={styles.appointmentContainer}>
					<View style={styles.headers}>
						<Text style={styles.text}>{this.props.header}</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

const styles = StyleSheet.create({

	appointmentContainer: {
			flex: 1,
			flexDirection: 'row',
			paddingTop: 10,
			paddingBottom: 10,
			borderBottomWidth: 1,
			borderBottomColor: '#aaa',
	},

	headers: {
			justifyContent: 'center',
	},

	text: {
		paddingLeft: 20,
		fontSize: 30,
	}
});