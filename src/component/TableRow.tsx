import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../context/User.Context';

const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: left;
  padding-bottom: 1px;
`;

const EditText = styled.TextInput`
  padding-bottom: 1px;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  flex: 1;
  color: rgb(38, 38, 38);
  background-color: 'rgb(200,200,200)';
`;

const WorkoutIcon = ({name}: {name: string}) => {
  return <Icon name={name} size={14} color={'rgb(169,169,169)'} />;
};

export default function TableRow({
  row,
  index,
  workoutId,
}: {
  row: any;
  index: Number;
  workoutId: String;
}) {
  const {clickComplete, deleteSet, editSet} = useContext(UserContext);

  const [reps, setReps] = useState('10');
  const [weight, setWeight] = useState('0');

  const onChangedReps = (text: string) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    setReps(newText);
  };

  const onChangedWeight = (text: string) => {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    setWeight(newText);
  };

  return (
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
          maxLength={3}
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
          maxLength={3}
        />
      ) : (
        <DataTable.Cell style={styles.cell}>
          <ExerciseSetText>{row.Weight}</ExerciseSetText>
        </DataTable.Cell>
      )}
      <DataTable.Cell style={styles.cell}>
        <TouchableOpacity
          onPress={() => clickComplete({row, index, workoutId})}>
          <WorkoutIcon name={row.Completion} />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <TouchableOpacity
          onPress={() => editSet({row, index, workoutId, reps, weight})}>
          {row.Edit ? (
            <WorkoutIcon name="check" />
          ) : (
            <WorkoutIcon name="edit" />
          )}
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell style={styles.cell}>
        <TouchableOpacity onPress={() => deleteSet({index, workoutId})}>
          <WorkoutIcon name="trash" />
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
});
