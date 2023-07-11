import React from 'react';
import renderer from 'react-test-renderer';
import {UserContext} from '../context/User.Context';
import {expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

afterEach(cleanup);

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
  expect(tree).toMatchSnapshot();
});

test('Displays correct text for initial question to user', async () => {
  const {getByText} = render(
    <UserContext.Provider
      value={{muscleGroup: [], selectedMuscles: [], loading: false}}>
      <HomeScreen {...props} />
    </UserContext.Provider>,
  );
  expect(getByText('What muscle group do you want to target?')).toBeDefined();
});

test('Multi-select list drops down when clicked', () => {
  const {getByText} = render(
    <UserContext.Provider
      value={{
        muscleGroup: ['biceps', 'triceps'],
        selectedMuscles: [],
        loading: false,
      }}>
      <HomeScreen {...props} />
    </UserContext.Provider>,
  );
  fireEvent.press(getByText('Select option'));
  waitFor(() => expect(screen.findByTestId('scroll-view')).toBeInTheDocument());
});
