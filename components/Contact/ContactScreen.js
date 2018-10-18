import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default class Contact extends React.Component {
    //Her settes tittelen som brukes i navigasjonsbaren
    static navigationOptions = {
        title: "Contact",
    }

    render() {
        return (
            <View style={styles.contact}>
                <View style={styles.picture}>
                    <Avatar
                        xlarge
                        title={this.props.navigation.getParam("name").split(" ").map(x => x[0]).join("")}
                        overlayContainerStyle={{backgroundColor: "#abcccc"}}
                    />
                </View>
                {/* this.props.navigation.getParam() tilsvarer this.props. uten bruk av navigasjonsbiblioteket */}
                <View style={styles.infoLine}>
                    <Icon name="person"/>
                    <Text style={styles.text}>{this.props.navigation.getParam("name")}</Text>
                </View>
                <View style={styles.infoLine}>
                    <Icon name="phone" />
                    <Text style={styles.text}>{this.props.navigation.getParam("number")}</Text>
                </View>
                <View style={styles.infoLine}>
                    <Icon name="email" />
                    <Text style={styles.text}>{this.props.navigation.getParam("email")}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    picture: {
        backgroundColor: "#abcccc",
        alignItems: "center",
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
});
