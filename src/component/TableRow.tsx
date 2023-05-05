import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
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
  background-color: 'rgb(169,169,169)';
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
  const {clickComplete, deleteSet} = useContext(UserContext);

  const [reps, onChangeReps] = React.useState('10');
  const [weight, onChangeWeight] = React.useState('0');
  const [isEditable, setIsEditable] = React.useState(false);

  const editSet = () => {
    isEditable ? setIsEditable(false) : setIsEditable(true);
  };

  return (
    <DataTable.Row>
      <DataTable.Cell style={styles.cell}>
        <ExerciseSetText>{row.Set}</ExerciseSetText>
      </DataTable.Cell>
      {isEditable ? (
        <EditText value={reps} onChangeText={onChangeReps} placeholder={'0'} />
      ) : (
        <DataTable.Cell style={styles.cell}>
          <ExerciseSetText>{row.Reps}</ExerciseSetText>
        </DataTable.Cell>
      )}
      {isEditable ? (
        <EditText
          value={weight}
          onChangeText={onChangeWeight}
          placeholder={'0'}
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
        <TouchableOpacity onPress={editSet}>
          <WorkoutIcon name="edit" />
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
