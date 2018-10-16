import React from 'react';
import ContactList from '../../components/ContactList/ContactListScreen.js';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

// const renderer = new ShallowRenderer();
// renderer.render(<ContactList />);
// const result = renderer.getRenderOutput();
// console.log(result.props.children);
// console.log(result.type);

it('renders correctly', () => {
    const tree = renderer.create(<ContactList />).toJSON();
    expect(tree).toMatchSnapshot();
});
