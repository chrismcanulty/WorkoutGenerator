import React, {ReactNode} from 'react';
import {ExerciseSet} from '../../types/data';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

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
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <ExerciseSetText>{item.Set}</ExerciseSetText>
      <ExerciseSetText>{item.Reps}</ExerciseSetText>
      <ExerciseSetText>{item.Weight}</ExerciseSetText>
      <ExerciseSetText>{item.Completion}</ExerciseSetText>
    </View>
  );
}
