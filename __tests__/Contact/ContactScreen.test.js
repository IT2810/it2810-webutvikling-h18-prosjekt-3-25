import React from 'react';
import Contact from '../../components/Contact/ContactScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// Trengs for å la Contact mota props, siden disse blir sendt med ract-navigation.
const navigation = {getParam: jest.fn(() => {
    return "test Person";
})}

it("renders correctly", () => {
    const tree = renderer.create(<Contact navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
})
