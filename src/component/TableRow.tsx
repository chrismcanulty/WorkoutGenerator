import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../context/User.Context';

const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: center;
  padding-bottom: 1px;
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
  const {clickComplete} = useContext(UserContext);

  console.log('rowlalala', row);

  return (
    <DataTable.Row>
      <DataTable.Cell>
        <ExerciseSetText>{row.Set}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <ExerciseSetText>{row.Reps}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <ExerciseSetText>{row.Weight}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity
          onPress={() => clickComplete({row, index, workoutId})}>
          <WorkoutIcon name={row.Completion} />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity>
          <WorkoutIcon name="edit" />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity>
          <WorkoutIcon name="trash" />
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
}
