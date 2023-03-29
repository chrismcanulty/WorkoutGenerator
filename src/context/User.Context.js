import React, {useState, useEffect} from 'react';
import {node} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState([]);

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
    // TODO: catch error
    //TODO: think about context name?
    const res = await axios.get('https://wger.de/api/v2/muscle/');
    // const { data: { results }} = await axios.get('https://wger.de/api/v2/muscle/');
    setMuscleGroup(res?.data?.results);
  };

  useEffect(() => {
    checkOnboarding();
    fetchMuscleGroup();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{shouldShowOnboarding, setShouldShowOnboarding, muscleGroup}}>
        {children}
      </UserContext.Provider>
    </>
  );
};

UserProvider.propTypes = {
  children: node.isRequired,
};

export default UserProvider;
