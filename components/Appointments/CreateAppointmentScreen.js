import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class CreateAppointmentScreen extends React.Component {
	//Her settes tittelen som brukes i navigasjonsbaren
	static navigationOptions = {
		title: "Create Appointment",
	}

	constructor(props) {
		super(props);
		this.state = {
			header: "",
			date: "",
			description: "",
			isDateTimePickerVisible: false,
		}

		this.handleOnPress = this.handleOnPress.bind(this);
		this.handleDatePicked = this.handleDatePicked.bind(this);
		this.showDateTimePicker = this.showDateTimePicker.bind(this);
		this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
	};
	
	showDateTimePicker() {
		this.setState({isDateTimePickerVisible: true });
	}

	hideDateTimePicker() {
		this.setState({isDateTimePickerVisible: false });
	}
	//setter state til date ut ifra valgt datetime i datetime-picker
	handleDatePicked(datetime) {
		this.setState({date: moment(datetime).format('Do MMMM YYYY, HH:mm')});
		this.hideDateTimePicker();
	}

	//Lager et kontakt-objekt ut fra informasjonen som er lagret i state
	//Setter så state til opprinnelig form igjen, for så å navigere til kontaklisten
	handleOnPress() {
		if (this.state.header!="" && this.state.date!=""){


			const appointment = {
				header: this.state.header,
				date: this.state.date,
				description: this.state.description,
			}

			//Dette tilsvarer this.props.onPress(contact) uten bruk av navigasjonsbiblioteket
			this.props.navigation.getParam("onPress")(appointment);
			this.setState(state => ({
				header: "",
				date: "",
				description: "",
			}));
			this.props.navigation.goBack();
		}
		else {
			alert("Cannot create an appointment without a title AND a date");
		}
	}

	render() {
		return (
			<View style={styles.createAppointmentContainer}>
				<View style ={styles.createAppointmentList}>
				{/* Oppdaterer hvert av feltene i state etterhvert som teksten endrer seg */}
					<FormLabel>Title</FormLabel>
					<FormInput onChangeText={(text) => this.setState(state => ({header: text}))} />

					<FormLabel>Description</FormLabel>
					<FormInput onChangeText={(text) => this.setState(state => ({description: text}))}/>
					
					<View style={styles.button}>
						<Button
							title="Select Date"
							backgroundColor="#51afaa"
							onPress={this.showDateTimePicker}
						/>
					</View>

					<View style={styles.text}>
						<Text style={{color: '#51afaa'}}> Selected Datetime: {this.state.date} </Text>
					</View>
				</View>

				<View style={styles.icon}>
					<Icon
						name="check"
						reverse={true}
						size={50}
						color="#51afaa"
						onPress={this.handleOnPress}
					/>
				</View>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					mode="datetime"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	createAppointmentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	createAppointmentList: {
		flex: 1,
	},

	icon: {
		padding: 10,
		alignItems: 'flex-end',
	},

	button: {
		paddingTop: 10,
	},

	text: {
		alignItems: 'center',
		paddingTop: 10,
	},
});