import React from 'react';
import HomeScreen from './HomeScreen';
import renderer from 'react-test-renderer';
// import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import {expect, test} from '@jest/globals';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

let props: any;
beforeEach(() => {
  props = createTestProps({});
});

test('renders correctly', () => {
  const tree = renderer.create(<HomeScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// /**
//  * @format
//  */

// import 'react-native';
// import React from 'react';
// import App from '../src/App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });
