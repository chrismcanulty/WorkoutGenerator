import React, {ReactNode, useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {SequenceItem, MuscleItem} from '../../types/data';
import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import {UserContext} from '../context/User.Context';
import FilterMuscleGroup from './ExerciseInfo';

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

// filter muscleGroup data based on muscle id and return the muscle name

export default function ExerciseItem({
  item,
  children,
}: {
  item: SequenceItem;
  children?: ReactNode;
}) {
  const {muscleGroup} = useContext(UserContext);

  // console.log('item', muscleName(item.muscles[0]));
  // console.log('muscleGroup', muscleGroup[0].id);
  // item muscles is an array of numbers

  return (
    <>
      <ExerciseText>{item.name}</ExerciseText>
      <Popover
        from={
          <TouchableOpacity>
            <ExerciseText>Muscle info</ExerciseText>
          </TouchableOpacity>
        }>
        <ExerciseText>Primary muscle(s): </ExerciseText>
        <FilterMuscleGroup item={item} muscleGroup={muscleGroup} />
        {item.muscles_secondary.length > 0 && (
          <>
            <ExerciseText>Secondary muscle(s): </ExerciseText>
            <FilterMuscleGroup item={item} muscleGroup={muscleGroup} />
          </>
        )}
      </Popover>
    </>
    // <ExerciseContainer>
    //   <ExerciseText>{item.name}</ExerciseText>
    //   {/* Add equipment, muscles, description */}
    //   {children}
    //   {/* Display list of primary muscles */}
    //   <FlatList
    //     data={item.muscles}
    //     renderItem={({item}) => {
    //       return <ExerciseText>Primary muscle(s): {item}</ExerciseText>;
    //     }}
    //     keyExtractor={item => item}
    //   />
    //   {/* Display list of secondary muscles in one text element */}
    // </ExerciseContainer>
  );
}
