import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default class Contact extends React.Component {
    render() {
        return (
            <View style={styles.contact}>
                <View style={styles.picture}>
                    <View style={styles.backButton}>
                        <Icon
                            name="arrow-back"
                            color="white"
                            onPress={() => console.log("Add render call here")}
                            underlayColor="transparent"
                        />
                    </View>
                    <View style={styles.avatar}>
                        <Avatar
                            xlarge
                            title={this.props.name.split(" ").map(x => x[0]).join("")}
                            overlayContainerStyle={{backgroundColor: "#abcccc"}}
                        />
                    </View>
                    <View style={styles.picturePadding}>
                        {/*This is needed to be able to center the avatar*/}
                    </View>
                </View>
                <View style={styles.texts}>
                    <View style={styles.infoLine}>
                        <Icon name="person"/>
                        <Text style={styles.text}>{this.props.name}</Text>
                    </View>
                    <View style={styles.infoLine}>
                        <Icon name="phone" />
                        <Text style={styles.text}>{this.props.number}</Text>
                    </View>
                    <View style={styles.infoLine}>
                        <Icon name="email" />
                        <Text style={styles.text}>{this.props.email}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    contact: {
        flex: 1,
    },

    picture: {
        backgroundColor: "#abcccc",
        flex: 1,
        flexDirection: "row",
    },

    backButton: {
        flex: 1,
        alignItems: "flex-start",
    },

    avatar: {
        alignItems: "center",
        justifyContent: "center",
    },

    picturePadding: {
        flex: 1,
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
});
