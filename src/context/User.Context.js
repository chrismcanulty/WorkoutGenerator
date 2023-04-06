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
  const [numberOfExercises, setNumberOfExercises] = useState('0');
  const [exerciseData, setExerciseData] = useState([]);

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

  const fetchExercises = async () => {
    let tempMuscleArr = [];
    for (let i = 0; i < selectedMuscles.length; i++) {
      const [filteredMuscleGroup] = muscleGroup.filter(
        muscle => muscle.name_en === selectedMuscles[i],
      );
      tempMuscleArr.push(filteredMuscleGroup.id);
    }
    const muscleIds = tempMuscleArr.join(',');

    let tempEquipmentArr = [];
    for (let i = 0; i < selectedEquipment.length; i++) {
      const [filteredEquipmentTypes] = equipmentTypes.filter(
        equipment => equipment.name === selectedEquipment[i],
      );
      tempEquipmentArr.push(filteredEquipmentTypes.id);
    }
    const equipmentIds = tempEquipmentArr.join(',');

    try {
      const res = await axios.get(
        `https://wger.de/api/v2/exercise/?muscles=${muscleIds}&equipment=${equipmentIds}&language=2`,
      );
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()];
      }
      const filteredData = getUniqueListBy(res.data.results, 'id');
      setExerciseData(filteredData);
    } catch (err) {
      setErrorMessage(err);
    }
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
          numberOfExercises,
          setNumberOfExercises,
          exerciseData,
          setExerciseData,
          fetchExercises,
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
