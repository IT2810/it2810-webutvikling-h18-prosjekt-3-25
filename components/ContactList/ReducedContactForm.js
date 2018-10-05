import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableNativeFeedback} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default class ReducedContactForm extends React.Component {
    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("ContactScreen")}>
                <View style={styles.contactFormContainer}>
                    <Avatar
                        medium
                        rounded
                        title={this.props.name.split(" ").map(x => x[0]).join("")}
                    />
                    <View style={styles.names}>
                        <Text style={styles.text}>{this.props.name}</Text>
                    </View>
                </View>
        </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({

    contactFormContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa",
    },

    names: {
        justifyContent: "center",
    },

    text: {
        paddingLeft: 20,
        fontSize: 18,
    }
});
