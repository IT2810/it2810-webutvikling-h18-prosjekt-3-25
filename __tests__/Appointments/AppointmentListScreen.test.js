import React from 'react';
import AppointmentListScreen from '../../components/Appointments/AppointmentListScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<AppointmentListScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})
