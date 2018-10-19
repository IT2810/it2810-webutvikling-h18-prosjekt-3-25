import React from 'react';
import AppointmentScreen from '../../components/Appointments/AppointmentScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

const navigation = {getParam: jest.fn(() => {
	return "test appointment"
})}

it("renders correctly", () => {
    const tree = renderer.create(<AppointmentScreen navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
})