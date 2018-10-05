import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Contact from '../Contact/Contact.js';
import ReducedContactForm from './ReducedContactForm'

export default class ContactList extends React.Component {
    render() {
        return (
            <View style={styles.contactListContainer}>
                <View style={styles.addContact}>
                    <Icon
                        name="person-add"
                        size={70}
                        onPress={() => this.props.navigation.navigate("CreateContactScreen")}
                    />
                </View>
                <View style={styles.listContainter}>
                    <Text>Contacts</Text>
                    <FlatList
                        data={[
                            {
                                key: "Leif",
                                name: "Leif Ulvund",
                                number:"45432377",
                                email: "leif.ulvund@gmail.com",
                            },
                            {
                                key: "Manu",
                                name: "Emanuele Caprioli",
                                number: "92026636",
                                email: "manu.caprioli@gmail.com",
                            },
                        ]}
                        renderItem={({item}) => <ReducedContactForm name={item.name}/>}
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
