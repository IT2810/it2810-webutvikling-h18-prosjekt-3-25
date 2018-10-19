import React from 'react';
import HomeScreen from '../../App.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})
