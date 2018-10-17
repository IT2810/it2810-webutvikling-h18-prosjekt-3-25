import React from 'react';
import CreateContact from '../../components/Contact/CreateContactScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<CreateContact />).toJSON();
    expect(tree).toMatchSnapshot();
})

// it("handleOnPress works correctly", () => {
//     const createContactInstance = renderer.create(<CreateContact />).getInstance();
//     // console.log(createContactInstance);
//     createContactInstance.findByProps("onChangeText");
// })
