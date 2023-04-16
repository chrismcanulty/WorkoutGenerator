import React, {ReactNode, useContext} from 'react';
import {SequenceItem} from '../../types/data';
import styled from 'styled-components/native';
import Popover from 'react-native-popover-view';
import {UserContext} from '../context/User.Context';
import {FilterMuscleGroup, ExerciseDetails} from './ExerciseInfo';
import PlannerIcon from 'react-native-vector-icons/FontAwesome5';
import {BorderBottom} from '../../types/data';

const ExerciseView = styled.View<BorderBottom>`
  border-color: rgb(230, 230, 230);
  border-top-width: 1px;
  padding-bottom: 10px;
  border-bottom-width: ${props => props.borderBottom}px;
`;
const ExerciseInfoView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ExerciseTitleView = styled.View`
  background-color: rgb(200, 200, 200);
`;
const ExerciseText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 20px;
  padding: 10px;
  text-align: left;
  margin-left: 20px;
`;
const InfoText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: left;
  margin-left: 30px;
  padding-bottom: 5px;
  width: 40%;
`;
const InfoButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;
const MuscleText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  padding: 5px;
  text-align: left;
  margin-left: 15px;
`;

export default function WorkoutExercise({
  item,
  isLastItem,
}: {
  item: SequenceItem;
  children?: ReactNode;
  isLastItem: boolean;
}) {
  const {muscleGroup} = useContext(UserContext);
  return (
    <ExerciseView borderBottom={isLastItem ? 1 : 0}>
      <ExerciseTitleView>
        <ExerciseText>{item.name}</ExerciseText>
      </ExerciseTitleView>
      <ExerciseInfoView>
        <Popover
          arrowSize={{width: 0, height: 0}}
          from={
            <InfoButton>
              <InfoText>Muscle info</InfoText>
              <PlannerIcon
                name="info-circle"
                size={14}
                color={'rgb(169,169,169)'}
              />
            </InfoButton>
          }>
          <MuscleText>Primary muscle(s): </MuscleText>
          <FilterMuscleGroup item={item} muscleGroup={muscleGroup} />
          {item.muscles_secondary.length > 0 && (
            <>
              <MuscleText>Secondary muscle(s): </MuscleText>
              <FilterMuscleGroup item={item} muscleGroup={muscleGroup} />
            </>
          )}
        </Popover>
        {item?.description && (
          <Popover
            arrowSize={{width: 0, height: 0}}
            from={
              <InfoButton>
                <InfoText>Exercise info</InfoText>
                <PlannerIcon
                  name="info-circle"
                  size={14}
                  color={'rgb(169,169,169)'}
                />
              </InfoButton>
            }>
            <ExerciseDetails item={item} />
          </Popover>
        )}
      </ExerciseInfoView>
    </ExerciseView>
  );
}
