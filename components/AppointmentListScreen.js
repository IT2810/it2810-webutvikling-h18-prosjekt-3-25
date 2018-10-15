import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import ReducedAppointment from './ReducedAppointment.js';

export default class AppointmentListScreen extends React.Component {
	//tittel til navigasjonsbaren
	static navigationOptions = {
		title: "AppointmentList",
	}

	constructor(props){
		super(props);
		//Henter data fra AsyncStorage
		this.state = {
			appointments: this.retrieveData(),
		};
		this.clearOnPress = this.clearOnPress.bind(this);
		this.handleOnPress = this.handleOnPress.bind(this);
	}

	//henter appointments som er lagret med AsyncStorage og oppdaterer state
	async retrieveData() {
		try {
			const value = await AsyncStorage.getItem("APPOINTMENTS");
			if (value !== null) {
				const parsedValue = JSON.parse(value);
				this.setState(state => ({appointments: parsedValue}));
			}
			else {
				this.setState(state => ({appointments: []}));
			}
		}
		catch(error) {
			console.log(error);
		}
	}

	//lagrer data til AsyncStorage
	async storeData(appointmentList) {
		const appointmentListString = JSON.stringify(appointmentList);
		try {
			await AsyncStorage.setItem("APPOINTMENTS", appointmentListString);
		}
		catch(error) {
			console.log(error);
		}
	}

	//fjerner data fra AsyncStorage
	async clearData() {
		try {
			await AsyncStorage.removeItem("APPOINTMENTS");
		}
		catch(error) {
			console.log(error);
		}
	}

	//Håndterer fjerning av data fra AsyncStorage og FlatList
	clearOnPress() {
		this.clearData();
		this.retrieveData();
	}

	//Håndterer logikk for opprettingen av nye appointments
	handleOnPress(appointment) {
		let stateClone = [...this.state.appointments, appointment];

		this.storeData(stateClone);
		this.setState(state => ({
			appointments: stateClone,
		}))
	}

	render() {
		return (
			<View style={styles.appointmentListContainer}>
				
				<View style= {styles.listContainer}>
					<Text style={styles.title} >Appointments, Reminders and Events</Text>
					<FlatList
						data={this.state.appointments}
						keyExtractor={(item, index) => item.date}
						renderItem={({item}) => <ReducedAppointment header={item.header} onPress={() => this.props.navigation.navigate("Appointment", {header: item.header, date: item.date, description: item.description })}/>}
					/>
					<View style={styles.clearButton}>
						<Button
							title="Clear All"
							onPress={this.clearOnPress}
						/>
					</View>
				</View>
				<View style={styles.addAppointment}>
					<Icon
						name="add"
						reverse={true}
						color="#517fa4"
						size={50}
						onPress={() => this.props.navigation.navigate("CreateAppointment", {onPress: this.handleOnPress})}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	appointmentListContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	clearButton: {
		alignItems: 'center',
	},

	addAppointment: {
		alignItems: 'flex-end',
	},

	listContainer: {
		flex: 1,
	},
	title: {
		fontSize: 30,
		textAlign:'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor:'#87cefa',
	}
});

