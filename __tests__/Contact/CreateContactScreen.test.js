import React from 'react';
import CreateContact from '../../components/Contact/CreateContactScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { FormInput } from 'react-native-elements';

it("renders correctly", () => {
    const tree = renderer.create(<CreateContact />).toJSON();
    expect(tree).toMatchSnapshot();
})



//Denne testen burde brukt Enzyme og er derfor ikke tatt med
// it("handleOnPress works correctly", () => {
//     const componentInstance = renderer.create(<CreateContact />).getInstance()
//     const componentRoot = renderer.create(<CreateContact />).root;
//     componentRoot.instance.props.onChangeText="hei";
//     console.log(componentRoot.instance.state);
//     componentInstance.handleOnPress();
// })
