import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../context/User.Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditText = styled.TextInput`
  background-color: 'rgb(200,200,200)';
  color: rgb(38, 38, 38);
  flex: 1;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  padding-bottom: 1px;
  text-align: center;
`;

const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  padding-bottom: 1px;
  text-align: left;
`;

const WorkoutIcon = ({name}: {name: string}) => {
  return <Icon name={name} size={14} color={'rgb(169,169,169)'} />;
};

export default function FavouriteTableRow({
  row,
  index,
  token,
  workoutId,
}: {
  row: any;
  index: Number;
  token: number;
  workoutId: String;
}) {
  const {
    favouriteClickComplete,
    favouriteDeleteSet,
    favouriteEditSet,
    favouriteWorkoutData,
  } = useContext(UserContext);

  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('0');

  // prevent user from being able to input non-integer values or partial reps

  const onChangedReps = (text: string) => {
    isNaN(Number(text)) || text.includes('.')
      ? (text = text.substr(0, text.length - 1))
      : text;

    setReps(text);
  };

  // prevent user from being able to input non-integer values for weight

  const onChangedWeight = (text: string) => {
    isNaN(Number(text)) ? (text = text.substr(0, text.length - 1)) : text;

    setWeight(text);
  };

  if (!row) {
    return null;
  }

  const saveFavouriteWorkoutData = async () => {
    try {
      const workoutJson = JSON.stringify(favouriteWorkoutData);

      await AsyncStorage.setItem(`@workout_key-${token}`, workoutJson);
    } catch (e) {
      // saving error
    }
  };

  const selectedFavouriteToken = token;

  // console.log('token', token);
  // console.log('title', title);
  // console.log('item', item);
  // console.log('favouriteWorkoutData', favouriteWorkoutData);
  // console.log('favouriteexercisedata', favouriteExerciseData);

  return (
    <>
      <DataTable.Row>
        <DataTable.Cell style={styles.cell}>
          <ExerciseSetText>{row.Set}</ExerciseSetText>
        </DataTable.Cell>
        {row.Edit ? (
          <EditText
            value={reps}
            keyboardType="numeric"
            onChangeText={text => onChangedReps(text)}
            placeholder={'0'}
            maxLength={7}
          />
        ) : (
          <DataTable.Cell style={styles.cell}>
            <ExerciseSetText>{row.Reps}</ExerciseSetText>
          </DataTable.Cell>
        )}
        {row.Edit ? (
          <EditText
            value={weight}
            keyboardType="numeric"
            onChangeText={text => onChangedWeight(text)}
            placeholder={'0'}
            maxLength={7}
          />
        ) : (
          <DataTable.Cell style={styles.cell}>
            <ExerciseSetText>{row.Weight}</ExerciseSetText>
          </DataTable.Cell>
        )}
        <DataTable.Cell style={styles.cell}>
          <TouchableOpacity
            onPress={() =>
              favouriteClickComplete({
                row,
                index,
                workoutId,
                selectedFavouriteToken,
              })
            }>
            <WorkoutIcon name={row.Completion} />
          </TouchableOpacity>
        </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>
          <TouchableOpacity
            onPress={() =>
              favouriteEditSet({
                row,
                index,
                workoutId,
                reps,
                weight,
                selectedFavouriteToken,
              })
            }>
            {row.Edit ? (
              <WorkoutIcon name="check" />
            ) : (
              <WorkoutIcon name="edit" />
            )}
          </TouchableOpacity>
        </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>
          <TouchableOpacity
            onPress={() =>
              favouriteDeleteSet({index, workoutId, selectedFavouriteToken})
            }>
            <WorkoutIcon name="trash" />
          </TouchableOpacity>
        </DataTable.Cell>
      </DataTable.Row>
    </>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
});
