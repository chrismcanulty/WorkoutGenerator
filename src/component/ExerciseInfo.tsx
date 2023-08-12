import React from 'react';
import {SequenceItem, MuscleItem} from '../../types/data';
import styled from 'styled-components/native';

const MuscleName = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat_Regular';
  font-size: 14px;
  margin-left: 20px;
  text-align: left;
`;
const MuscleList = styled.FlatList`
  margin-bottom: 10px;
`;
const PopoverText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat_Regular';
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: left;
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
    <MuscleList
      data={item.muscles}
      renderItem={({item}) => {
        return <MuscleName>· {muscleName(item)}</MuscleName>;
      }}
      keyExtractor={item => item}
    />
  );
};

export const ExerciseDetails = ({item}: {item: SequenceItem}) => {
  const filterText = (text: string) => {
    return text
      .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '')
      .trim();
  };
  return <PopoverText>{filterText(item.description)}</PopoverText>;
};
