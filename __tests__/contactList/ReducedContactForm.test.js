import React from 'react';
import ReducedContactForm from '../../components/ContactList/ReducedContactForm.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it("renders correctly", () => {
    const tree = renderer.create(<ReducedContactForm name="Test Person" />).toJSON();
    expect(tree).toMatchSnapshot();
})
