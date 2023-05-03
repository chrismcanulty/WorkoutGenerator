import React, {ReactNode, useContext, useState} from 'react';
import {SequenceItem, BorderBottom} from '../../types/data';
import styled from 'styled-components/native';
import Popover from 'react-native-popover-view';
import {UserContext} from '../context/User.Context';
import {FilterMuscleGroup, ExerciseDetails} from './ExerciseInfo';
import PlannerIcon from 'react-native-vector-icons/FontAwesome5';
import AddIcon from 'react-native-vector-icons/FontAwesome5';
import ExerciseData from './ExerciseData';
import {DataTable} from 'react-native-paper';
import exerciseSet from '../utils/exerciseset';

const AddText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: right;
  margin-left: 30px;
  padding-bottom: 5px;
  padding-right: 10px;
  width: 80%;
`;

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
const ExerciseSetText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  text-align: left;
  padding-bottom: 1px;
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
  margin-top: 4px;
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
  const [userSets, setUserSets] = useState(exerciseSet);

  const addSet = () => {
    const setNumber = userSets.length + 1;
    const newSet = {
      Set: setNumber,
      Reps: 10,
      Weight: 0.0,
      Completion: 'circle',
    };
    setUserSets([...userSets, newSet]);
  };

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
      <DataTable style={{marginLeft: 20}}>
        <DataTable.Header>
          <DataTable.Title>
            <ExerciseSetText>Set</ExerciseSetText>
          </DataTable.Title>
          <DataTable.Title>
            <ExerciseSetText>Reps</ExerciseSetText>
          </DataTable.Title>
          <DataTable.Title>
            <ExerciseSetText>Weight</ExerciseSetText>
          </DataTable.Title>
          <DataTable.Title>
            <ExerciseSetText>Done</ExerciseSetText>
          </DataTable.Title>
          <DataTable.Title>
            <ExerciseSetText>Edit</ExerciseSetText>
          </DataTable.Title>
          <DataTable.Title>
            <ExerciseSetText>Delete</ExerciseSetText>
          </DataTable.Title>
        </DataTable.Header>
        {userSets.map(data => (
          <ExerciseData item={data} key={data.Set} />
        ))}
      </DataTable>
      <InfoButton onPress={addSet}>
        <AddText>Add set</AddText>
        <AddIcon name="plus" size={14} color={'rgb(169,169,169)'} />
      </InfoButton>
    </ExerciseView>
  );
}
