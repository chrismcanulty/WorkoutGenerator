import React, {useState, useEffect} from 'react';
import {node} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [totalExercises, setTotalExercises] = useState([]);

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
    try {
      const res = await axios.get('https://wger.de/api/v2/muscle/');
      setMuscleGroup(res.data.results);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const fetchEquipmentTypes = async () => {
    try {
      const res = await axios.get('https://wger.de/api/v2/equipment/');
      setEquipmentTypes(res.data.results);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const equipmentData = () => {
    const temp = [];
    for (const equipment of equipmentTypes) {
      if (equipment.name) {
        temp.push({...equipment, key: equipment.id, value: equipment.name});
      }
    }
    return temp;
  };

  useEffect(() => {
    checkOnboarding();
    fetchMuscleGroup();
    fetchEquipmentTypes();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          shouldShowOnboarding,
          setShouldShowOnboarding,
          muscleGroup,
          equipmentTypes,
          errorMessage,
          selectedMuscles,
          setSelectedMuscles,
          selectedEquipment,
          setSelectedEquipment,
          equipmentData,
          totalExercises,
          setTotalExercises,
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
