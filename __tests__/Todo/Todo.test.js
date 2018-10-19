import React from 'react';
import TodoScreen from '../../components/StepCounter.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<TodoScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})
