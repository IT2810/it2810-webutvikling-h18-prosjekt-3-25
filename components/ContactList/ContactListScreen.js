import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import ContactScreen from '../Contact/ContactScreen.js';
import ReducedContactForm from './ReducedContactForm'

export default class ContactList extends React.Component {
    //Her settes tittelen som brukes i navigasjonsbaren
    static navigationOptions = {
        title: "ContactList",
    }

    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    name: "Leif Ulvund",
                    number: "45432377",
                    email: "leif.ulvund@gmail.com",
                },
                {
                    name: "Emanuele Caprioli",
                    number: "92026636",
                    email: "manu.caprioli@gmail.com",
                },
            ],
        };

        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress(contact) {
        let stateClone = [...this.state.users, contact]
        this.setState(state => ({
            users: stateClone,
        }))
    }

    render() {
        return (
            <View style={styles.contactListContainer}>

                <View style={styles.addContact}>
                    <Icon
                        name="person-add"
                        size={70}
                        onPress={() => this.props.navigation.navigate("CreateContact", {onPress: this.handleOnPress})}
                    />
                </View>

                <View style={styles.listContainter}>
                    <Text>Contacts</Text>
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item, index) => item.number}
                        // rendrer kontaktene i listen, og navigeter til kontakten med name, number og email som props når man trykker på kontakten
                        renderItem={({item}) => <ReducedContactForm name={item.name} onPress={() => this.props.navigation.navigate("Contact", {name: item.name, number: item.number, email: item.email})}/>}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    contactListContainer: {
        flex: 1,
    },

    addContact: {
        // flex: 1,
        alignItems: "flex-end",
    },

    listContainter: {
        flex: 1,
    },
});
