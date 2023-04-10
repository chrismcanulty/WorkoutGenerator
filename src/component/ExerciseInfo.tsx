import React from 'react';
import {SequenceItem, MuscleItem} from '../../types/data';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native';

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

const PopoverText = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;

export const FilterMuscleGroup = ({
  item,
  muscleGroup,
}: {
  item: SequenceItem;
  muscleGroup: Array<MuscleItem>;
}) => {
  const muscleName = (id: number) => {
    const targetMuscle = muscleGroup.filter(
      (muscle: MuscleItem) => muscle.id === id,
    );
    return targetMuscle[0].name_en || targetMuscle[0].name;
  };
  return (
    <FlatList
      data={item.muscles}
      renderItem={({item}) => {
        return <ExerciseText>{muscleName(item)}</ExerciseText>;
      }}
      keyExtractor={item => item}
    />
  );
};

export const ExerciseDetails = ({item}: {item: SequenceItem}) => {
  const filterText = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '');
  };
  console.log('description', item.description);
  return <PopoverText>{filterText(item.description)}</PopoverText>;
};
