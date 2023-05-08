import React, {useState, useEffect} from 'react';
import {node} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import exerciseSet from '../utils/exerciseset';

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
  const [workout, setWorkout] = useState({});
  const [isEditable, setIsEditable] = useState(false);

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

  const filterParams = (selectArr, dataArr, name) => {
    let tempArr = [];
    for (let i = 0; i < selectArr.length; i++) {
      const [filteredArr] = dataArr.filter(item => item[name] === selectArr[i]);
      tempArr.push(filteredArr.id);
    }
    return tempArr.join(',');
  };

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  function shuffleData(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  const defaultExercises = data => {
    let allExercises = {};
    data.map((_, index) => (allExercises[data[index].id] = [...exerciseSet]));
    setWorkout(allExercises);
  };

  const clickComplete = ({row, index, workoutId}) => {
    const tempWorkout = {...workout};
    const modifyComplete =
      row.Completion === 'check-circle'
        ? {...row, Completion: 'circle'}
        : {...row, Completion: 'check-circle'};
    tempWorkout[workoutId][index] = modifyComplete;
    setWorkout(tempWorkout);
  };

  const editSet = ({row, index, workoutId, reps, weight}) => {
    const tempWorkout = {...workout};
    const editRow =
      row.Edit === true
        ? {...row, Edit: false, Reps: reps, Weight: weight}
        : {...row, Edit: true};
    tempWorkout[workoutId][index] = editRow;
    setWorkout(tempWorkout);
  };

  const addSet = ({workoutId}) => {
    const tempWorkout = {...workout};
    const setNumber = tempWorkout[workoutId].length + 1;
    const newSet = {
      Set: setNumber,
      Reps: 10,
      Weight: 0.0,
      Completion: 'circle',
    };
    tempWorkout[workoutId].push(newSet);
    setWorkout(tempWorkout);
  };

  const deleteSet = ({index, workoutId}) => {
    const tempWorkout = {...workout};
    tempWorkout[workoutId].splice(index, 1);
    tempWorkout[workoutId].map((set, index) => {
      set.Set = index + 1;
    });
    setWorkout(tempWorkout);
  };

  const fetchExercises = async () => {
    const muscleIds = filterParams(selectedMuscles, muscleGroup, 'name_en');
    const equipmentIds = filterParams(
      selectedEquipment,
      equipmentTypes,
      'name',
    );

    try {
      const res = await axios.get(
        `https://wger.de/api/v2/exercise/?muscles=${muscleIds}&equipment=${equipmentIds}&language=2`,
      );

      // remove duplicates + limit returned results to user specified # of exercises, then set to state

      const filteredData = getUniqueListBy(res.data.results, 'id');
      const shuffledData = shuffleData(filteredData);
      const randomizedData = shuffledData.slice(0, numberOfExercises);
      setExerciseData(randomizedData);
      defaultExercises(randomizedData);
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
          fetchExercises,
          exerciseData,
          workout,
          clickComplete,
          addSet,
          deleteSet,
          isEditable,
          setIsEditable,
          editSet,
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
