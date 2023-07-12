import React from 'react';
import {UserContext} from '../context/User.Context';
import {expect} from '@jest/globals';
import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
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

  it('Displays correct text for initial question to user', async () => {
    const {getByText} = render(
      <UserContext.Provider
        value={{muscleGroup: [], selectedMuscles: [], loading: false}}>
        <HomeScreen {...props} />
      </UserContext.Provider>,
    );
    expect(getByText('What muscle group do you want to target?')).toBeDefined();
  });

  it('Error message appears when Next button is clicked without selecting muscle groups', () => {
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
    waitFor(() => fireEvent.press(getByText('Next')));
    expect(getByText('Please select at least one muscle group')).toBeTruthy();
  });
});
