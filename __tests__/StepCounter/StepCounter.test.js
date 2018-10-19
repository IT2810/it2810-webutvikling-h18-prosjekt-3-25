import React from 'react';
import StepCounter from '../../components/StepCounter.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<StepCounter />).toJSON();
    expect(tree).toMatchSnapshot();
})
