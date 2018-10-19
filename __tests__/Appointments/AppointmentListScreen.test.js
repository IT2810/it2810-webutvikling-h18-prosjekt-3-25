import React from 'react';
import AppointmentListScreen from '../../components/Appointments/AppointmentListScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AsyncStorage } from 'react-native'
import MockAsyncStorage from 'mock-async-storage';

it("renders correctly", () => {
    const tree = renderer.create(<AppointmentListScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})

const renderedComponent = renderer.create(<AppointmentListScreen/>);
const componentInstance = renderedComponent.getInstance();

const Appointment = {
	header: "bais med leif",
	date: "15th October 2018, 12:12",
	description: "skal baise leif til helvete",
}

afterEach(() => {
	AsyncStorage.removeItem("APPOINTMENTS");
})
// Dette er en kodesnutt fra https://www.npmjs.com/package/mock-async-storage
// Her brukes 'mock-async-storage'-biblioteket til å håndtere, som navnet antyder,
// mockingen av AsyncStorage.
const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

mock();

//Sjekker om storeData(avtale) lagrer valgt data til AsyncStorage
it('storeData working', async () => {
	expect.assertions(1);
	await componentInstance.storeData(Appointment);
	const value = await AsyncStorage.getItem("APPOINTMENTS");
	expect(value).toBe(JSON.stringify(Appointment));
})

//sjekker om retrieveData() gir en tom liste fra AsyncStorage
it('retrive-no-Data working', async () => {
	expect.assertions(1);
	const value = await componentInstance.retrieveData();
	expect(value).toEqual([]);
})

//sjekker om retrieveData() henter lagt inn avtale
it('retrieveData working', async () => {
	expect.assertions(1);
	await componentInstance.storeData(Appointment);
	const value= await componentInstance.retrieveData();
	expect(value).toEqual(Appointment);

})

//sjekker om data blir slettet etter å ha blitt lagt inn og removeData(key) har blitt kalt
it ('removeData works', async () => {
	expect.assertions(1);
	await componentInstance.storeData(Appointment);
	await componentInstance.removeData(Appointment.date);
	const value = await componentInstance.retrieveData();
	expect(value).toEqual([]);
})

