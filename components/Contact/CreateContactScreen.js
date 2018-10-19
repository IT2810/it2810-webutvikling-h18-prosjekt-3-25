import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class CreateContact extends React.Component {
    //Her settes tittelen som brukes i navigasjonsbaren
    static navigationOptions = {
        title: "Create Contact"
    }

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            email: "",
        }

        this.handleOnPress = this.handleOnPress.bind(this);
    };

    //Lager et kontakt-objekt ut fra informasjonen som er lagret i state
    //Setter så state til opprinnelig form igjen, for så å navigere til kontaklisten
    handleOnPress() {
        const contact = {
            name: this.state.name,
            number: this.state.number,
            email: this.state.email,
        }

        //Dette tilsvarer this.props.onPress(contact) uten bruk av navigasjonsbiblioteket
        this.props.navigation.getParam("onPress")(contact);
        this.setState(state => ({
            name: "",
            number: "",
            email: "",
        }));
        this.props.navigation.goBack();
    }

    render() {
        return (
            // KeyboardAvoidingView gjør at skjermbildet tilpasser seg det digitale
            // tastaturet
            <KeyboardAvoidingView style={styles.createContactContainer} behaivor="padding" >
                <View style={styles.icon}>
                    <Icon
                        name="person-add"
                        size={50}
                        onPress={this.handleOnPress}
                    />
                </View>
                <View>
                    {/* Oppdaterer hvert av feltene i state etterhvert som teksten endrer seg */}
                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={(text) => this.setState(state => ({name: text}))} />

                    <FormLabel>Number</FormLabel>
                    <FormInput onChangeText={(text) => this.setState(state => ({number: text}))} keyboardType="numeric"/>

                    <FormLabel>Email</FormLabel>
                    <FormInput onChangeText={(text) => this.setState(state => ({email: text}))} keyboardType="email-address"/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    createContactContainer: {
        flex: 1,
    },

    icon: {
        padding: 10,
        alignItems: "flex-end",
    },
});
