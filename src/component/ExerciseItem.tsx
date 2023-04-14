import React, {ReactNode, useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {SequenceItem} from '../../types/data';
import styled from 'styled-components/native';
import Popover from 'react-native-popover-view';
import {UserContext} from '../context/User.Context';
import {FilterMuscleGroup, ExerciseDetails} from './ExerciseInfo';
import PlannerIcon from 'react-native-vector-icons/FontAwesome5';

const ExerciseContainer = styled.View``;

interface Props {
  borderBottom: number;
}

const ExerciseView = styled.View<Props>`
  border-color: rgb(230, 230, 230);
  border-top-width: 1px;
  border-bottom-width: ${props => props.borderBottom}px;
`;

const ExerciseText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 20px;
  padding: 10px;
  text-align: left;
  margin-left: 20px;
`;
const InfoText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  text-align: left;
  margin-left: 30px;
  padding-bottom: 5px;
`;

export default function ExerciseItem({
  item,
  isLastItem,
  children,
}: {
  item: SequenceItem;
  children?: ReactNode;
  isLastItem: boolean;
}) {
  const {muscleGroup} = useContext(UserContext);
  console.log('isLastItem', isLastItem);
  return (
    <ExerciseView borderBottom={isLastItem ? 1 : 0}>
      <ExerciseText>{item.name}</ExerciseText>
      <Popover
        from={
          <TouchableOpacity>
            <InfoText>Muscle info</InfoText>
            <PlannerIcon
              name="clipboard-list"
              size={30}
              color={'gray'}
              style={{marginLeft: 30}}
            />
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
      {item?.description && (
        <Popover
          from={
            <TouchableOpacity>
              <InfoText>Exercise info</InfoText>
              <PlannerIcon
                name="clipboard-list"
                size={30}
                color={'gray'}
                style={{marginLeft: 30}}
              />
            </TouchableOpacity>
          }>
          <ExerciseContainer>
            <ExerciseDetails item={item} />
          </ExerciseContainer>
        </Popover>
      )}
    </ExerciseView>
  );
}
