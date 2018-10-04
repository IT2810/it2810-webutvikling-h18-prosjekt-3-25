import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon } from 'react-native-elements';
 
export default class Appointment extends React.Component {
	render() {
		return (
			<View style={styles.appointment}>
				<View Style={styles.backButton}>
					<Icon
						name="arrow-back"
						color="black"
						size={50}
						onPress={ console.log("add render call here")}
					/>
				</View>
				<View style={styles.texts}>
					<View style={styles.headerView}>
						<Icon name="star"/>
						<Text style={styles.header}>{this.props.header}</Text>
					</View>
					<View style={styles.infoLine}>
						<Icon name="event" />
						<Text style={styles.text}>{this.props.date}</Text>
					</View>
					<View style={styles.infoLine}>
						<Icon name="description" />
						<Text style={styles.text}>{this.props.description}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	appointment: {
			flex: 1,
			paddingTop:20,
	},

	backButton: {
	    flex: 1,
	    alignItems: "flex-start",
		},

  texts: {
      flex: 2,
    },
	
	infoLine: {
      flexDirection: "row",
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#aaa",
    },

  text: {
      fontSize: 18,
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 20,
  },

	headerView: {
      flexDirection: "row",
      paddingLeft: 10,
      backgroundColor:"#87cefa",
  },
  header: {
  	 	fontSize: 30,
     	paddingBottom: 15,
     	paddingTop: 15,
      paddingLeft: 20,
  },
});