import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
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

        // const data = this.retrieveData();

        this.state = {
            contacts: this.retrieveData(),
        };

        this.handleOnPress = this.handleOnPress.bind(this);


    }

    // Henter kontakt-dataen som er lagret ved AsyncStorage og oppdaterer state
    async retrieveData() {
        try {
            const value = await AsyncStorage.getItem("CONTACTS");
            if (value !== undefined) {
                const parsedValue = JSON.parse(value);
                this.setState(state => ({contacts: parsedValue}));
                return parsedValue;
            } else {
                this.setState(state => ({contacts: []}));
                return [];
            }
        } catch(error) {
            console.log(error);
            return []
        }
    }

    // Lagrer listen med kontakter, contactList, i AsyncStorage
    async storeData(contactList) {
        const contactListString = JSON.stringify(contactList);
        try {
            await AsyncStorage.setItem("CONTACTS", contactListString);
        } catch(error) {
            console.log(error);
        }
    }

    // Kalles når en ny kontakt blir opprettet
    handleOnPress(contact) {
        let stateClone = [...this.state.contacts, contact];

        this.storeData(stateClone);
        this.setState(state => ({
            contacts: stateClone,
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
                        data={this.state.contacts}
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
