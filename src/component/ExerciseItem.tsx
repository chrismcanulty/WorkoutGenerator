import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SequenceItem} from '../../types/data';
import styled from 'styled-components/native';

const ExerciseText = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;

export default function ExerciseItem({
  item,
  children,
}: {
  item: SequenceItem;
  children?: ReactNode;
}) {
  return (
    <View>
      <ExerciseText>{item.name}</ExerciseText>
      {/* Add equipment, muscles, description */}
      {/* <ExerciseText>{item.description}</ExerciseText> */}
      {children}
    </View>
  );
}
