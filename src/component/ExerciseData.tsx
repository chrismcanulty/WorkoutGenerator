import React, {ReactNode, useState} from 'react';
import {ExerciseSet} from '../../types/data';
import styled from 'styled-components/native';
import {DataTable} from 'react-native-paper';
import CompleteIcon from 'react-native-vector-icons/FontAwesome5';
import EditIcon from 'react-native-vector-icons/FontAwesome5';
import DeleteIcon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: center;
  padding-bottom: 1px;
`;

export default function ExerciseData({
  item,
}: {
  item: ExerciseSet;
  children?: ReactNode;
}) {
  const [completeIcon, setCompleteIcon] = useState(item.Completion);

  const onPress = () => {
    completeIcon === 'check-circle'
      ? setCompleteIcon('circle')
      : setCompleteIcon('check-circle');
  };

  return (
    <DataTable.Row>
      <DataTable.Cell>
        <ExerciseSetText>{item.Set}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <ExerciseSetText>{item.Reps}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <ExerciseSetText>{item.Weight}</ExerciseSetText>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity onPress={onPress}>
          <CompleteIcon
            name={completeIcon}
            size={14}
            color={'rgb(169,169,169)'}
          />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity>
          <EditIcon name="edit" size={14} color={'rgb(169,169,169)'} />
        </TouchableOpacity>
      </DataTable.Cell>
      <DataTable.Cell>
        <TouchableOpacity>
          <DeleteIcon name="trash" size={14} color={'rgb(169,169,169)'} />
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );
}
