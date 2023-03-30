import React, {useState, useEffect} from 'react';
import {node} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // create new state that tracks selected muscle group so it's available app-wide
  // pass to home screen and set the state based on user selection
  // use this later to generate workout

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@isOnboarding');
      if (value === null) {
        setShouldShowOnboarding(true);
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err);
    }
  };

  const fetchMuscleGroup = async () => {
    // TODO: think about context name?
    try {
      const res = await axios.get('https://wger.de/api/v2/muscle/');
      // const { data: { results }} = await axios.get('https://wger.de/api/v2/muscle/');
      setMuscleGroup(res.data.results);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  useEffect(() => {
    checkOnboarding();
    fetchMuscleGroup();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          shouldShowOnboarding,
          setShouldShowOnboarding,
          muscleGroup,
          errorMessage,
        }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

UserProvider.propTypes = {
  children: node.isRequired,
};

export default UserProvider;
