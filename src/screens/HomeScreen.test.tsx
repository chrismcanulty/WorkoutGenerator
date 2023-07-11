import React from 'react';
import HomeScreen from './HomeScreen';
import renderer, {act} from 'react-test-renderer';
import {UserContext} from '../context/User.Context';
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

test('renders correctly', async () => {
  const tree = renderer
    .create(
      <UserContext.Provider
        value={{muscleGroup: [], selectedMuscles: [], loading: false}}>
        <HomeScreen {...props} />
      </UserContext.Provider>,
    )
    .toJSON();
  await wait();
  await wait();
  expect(tree).toMatchSnapshot();
});

export async function wait(ms = 0) {
  await act(async () => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}
