import React from 'react';
import CreateAppointment from '../../components/Appointments/CreateAppointmentScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<CreateAppointment />).toJSON();
    expect(tree).toMatchSnapshot() ;
})
