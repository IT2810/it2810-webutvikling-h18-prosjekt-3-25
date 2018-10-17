import React from 'react';
import Contact from '../../components/Contact/ContactScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// const navigation = { getParam: jest.fn(("name") => "Test Person") };
// const mockName = jest.fn((navigation.getParam("name")) => "Test Person");
// navigation.setParam("name")="Test Person";
// jest.mock("react-navigation", () => {});

it("faen", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Contact />);
    const result = renderer.getRenderOutput();
    console.log(result);

})

//Na testen her kan ferra te helvete :)
// it("renders correctly", () => {
//     const tree = renderer.create(<Contact />).toJSON();
//     expect(tree).toMatchSnapshot();
// })
