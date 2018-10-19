import React from 'react';
import { AsyncStorage } from 'react-native';
import MockAsynctorage from 'mock-async-storage';
import ContactList from '../../components/ContactList/ContactListScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';


// Dette er en kodesnutt fra https://www.npmjs.com/package/mock-async-storage
// Her brukes 'mock-async-storage'-biblioteket til å håndtere, som navnet antyder,
// mockingen av AsyncStorage.
const mock = () => {
    const mockImpl = new MockAsynctorage();
    jest.mock('AsyncStorage', () => mockImpl)
}
mock();


const contact = {
    name: "Test Person",
    number: "12345678",
    email: "email@email.com",
};


const renderedComponent = renderer.create(<ContactList />);
const componentInstance = renderedComponent.getInstance();

afterEach(() => {
    AsyncStorage.removeItem("CONTACTS");
})

// Tester at siden rendres riktig.
it('renders correctly', () => {
    tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
});

// Her testes storeData-funksjonen som bruker AsyncStorage for å lagre kontakter.
it('StoreData works correctly with one contact', () => {
    expect.assertions(1);
    return componentInstance.storeData(contact).then(() => {
        return AsyncStorage.getItem("CONTACTS").then(data => {
            expect(data).toBe(JSON.stringify(contact));
        })
    })
});

// Her testes RetreiveData-funksjonen når det finnes én kontakt.
it('RetrieveData works correctly with one contact', () => {
    expect.assertions(1);
    return componentInstance.storeData(contact).then(() => {
        return componentInstance.retrieveData().then(data => {
            expect(data).toEqual(contact);
        })
    })
})

// Her testes RetreiveData-funksjonen når det ikke finnes kontakter.
it('RetrieveData works correctly with no contacts', () => {
    expect.assertions(1);
        return componentInstance.retrieveData().then(data => {
            expect(data).toEqual([]);
        })
})


// Dette er forsøk på testing som ikke førte frem. De vises her for dokumentasjon.
/* ********************************************************************************** */
// const renderer = new ShallowRenderer();
// renderer.render(<ContactList />);
// const result = renderer.getRenderOutput();
// console.log(result.props.children);
// console.log(result.type);

// jest.mock('react-native', () => {
//     AsyncStorage: {
//         setItem: jest.fn(() => {
//             return new Promise((resolve, reject) => {
//                 resolve(null);
//             })
//         })
//
//         getItem: jest.fn(() => {
//             return new Promise((resolve, reject) => {
//                 resolve({
//                     name: "Test Person",
//                     number: "12345678",
//                     email: "email@email.com",
//                 });
//             })
//         })
//     }
// })
//
// jest.mock('../../components/ContactList/ContactListScreen.js', () => {
//     ContactList: {
//         retrieveData: jest.fn(() => {
//             return {
//                 name: "Test Person",
//                 number: "12345678",
//                 email: "email@email.com",
//             }
//         })
//
//         storeData: jest.fn(() => {
//             return new Promise((resolve, reject) => {
//                 resolve(null);
//             })
//         })
//     }
// })

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

// it("handleOnPress works correctly", async () => {
    // const contact = {
    //     name: "Test Person",
    //     number: "12345678",
    //     email: "email@email.com",
    // };
//
//     expect(componentInstance.state.contacts).toEqual([]);
//     await componentInstance.handleOnPress(contact);
//     console.log("etter state: " + componentInstance.state.contacts);
// })
