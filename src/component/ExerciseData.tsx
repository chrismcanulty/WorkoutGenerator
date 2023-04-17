import React, {ReactNode} from 'react';
import {ExerciseSet} from '../../types/data';
import styled from 'styled-components/native';
import {DataTable} from 'react-native-paper';

const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: left;
  padding-bottom: 1px;
`;

export default function ExerciseData({
  item,
}: {
  item: ExerciseSet;
  children?: ReactNode;
}) {
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
        <ExerciseSetText>{item.Completion}</ExerciseSetText>
      </DataTable.Cell>
    </DataTable.Row>
  );
}
