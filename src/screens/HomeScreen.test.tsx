import React from 'react';
import HomeScreen from './HomeScreen';
import renderer, {act} from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react';
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
  expect(tree).toMatchSnapshot();
});

test('Displays correct text for initial question to user', async () => {
  render(
    <UserContext.Provider
      value={{muscleGroup: [], selectedMuscles: [], loading: false}}>
      <HomeScreen {...props} />
    </UserContext.Provider>,
  );
  expect(
    screen.getByText('What muscle group do you want to target?'),
  ).toBeOnTheScreen();
});

export async function wait(ms = 0) {
  await act(async () => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

// jest.config.ts;

// import type {Config} from 'jest';

// const config: Config = {
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
// };

// export default config;
