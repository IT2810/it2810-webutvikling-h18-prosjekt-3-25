import React from 'react';
import { AsyncStorage } from 'react-native';
import ContactList from '../../components/ContactList/ContactListScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// const renderer = new ShallowRenderer();
// renderer.render(<ContactList />);
// const result = renderer.getRenderOutput();
// console.log(result.props.children);
// console.log(result.type);

//Before all
const renderedComponent = renderer.create(<ContactList />);
const componentInstance = renderedComponent.getInstance()

it('renders correctly', () => {
    tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
});

it("handleOnPress works correctly", async () => {
    const contact = {
        name: "Test Person",
        number: "12345678",
        email: "email@email.com",
    };
    // const stateContacts = contactListInstance.state.contacts;
    // console.log(contactListInstance);
    // console.log("før: " + contactListInstance.state.contacts);
    // contactListInstance.retrieveData();
    // console.log("etter: " + contactListInstance.state.contacts[0].name);

    expect(componentInstance.state.contacts).toEqual([]);
    await componentInstance.handleOnPress(contact);
    console.log("etter state: " + componentInstance.state.contacts);
    // expect(componentInstance.state.contacts).toEqual([]);
})


it('retrieveData works correctly with no contacts', () => {
    expect.assertions(2);
    // console.log(renderedComponent.getInstance());
    return componentInstance.retrieveData().then(data => {
        // console.log("state con: " + renderedComponent.getInstance().state.contacts)
        expect(componentInstance.state.contacts).toEqual([]);
        expect(data).toEqual([]);
    })
});

// it('storeData works correctly', async () => {
//     const contact = {
//         name: "Test Person",
//         number: "12345678",
//         email: "email@email.com",
//     }
//
//
//     await componentInstance.storeData(contact);
//     return expect(componentInstance.state.contacts).toEqual([{name: "Test Person", number: "12345678", email: "email@email.com" }]);
//
//     // return componentInstance.storeData(contact).then(() => {
//     //     return componentInstance.retrieveData().then(() => {
//     //         console.log("state: " + JSON.stringify(componentInstance.state.contacts));
//     //         expect(componentInstance.state.contacts).toEqual([{
//     //             name: "Test Person",
//     //             number: "12345678",
//     //             email: "email@email.com",
//     //         }]);
//     //     })
//     // })
// })

// it('retrieveData works correctly with contacts', () => {
//     expect.assertions(1);
//
// })
