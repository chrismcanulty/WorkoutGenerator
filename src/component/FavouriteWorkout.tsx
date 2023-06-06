import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {SequenceItem, BorderBottom} from '../../types/data';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Popover from 'react-native-popover-view';
import {UserContext} from '../context/User.Context';
import {FilterMuscleGroup, ExerciseDetails} from './ExerciseInfo';
import PlannerIcon from 'react-native-vector-icons/FontAwesome5';
import AddIcon from 'react-native-vector-icons/FontAwesome5';
import FavouriteExerciseData from './FavouriteExerciseData';
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  text-align: center;
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

export default function FavouriteWorkout({
  item,
  isLastItem,
  workoutId,
}: {
  workoutId: String;
  item: SequenceItem;
  children?: ReactNode;
  isLastItem: boolean;
}) {
  const {
    muscleGroup,
    favouriteWorkoutData,
    setFavouriteWorkoutData,
    addFavouriteSet,
    favouriteExerciseData,
    getFavouriteTokens,
    favouriteTokens,
  } = useContext(UserContext);

  const headers = ['Set', 'Reps', 'Weight', 'Done', 'Edit', 'Delete'];

  // need to save workout data in async storage and be able to link to exercises
  // which are rendered on the screen
  // create a workout id based on position within favourite workout array

  // const [favouriteTokens, setFavouriteTokens] = useState([]);

  // const getFavouriteTokens = async () => {
  //   try {
  //     let values = await AsyncStorage.getItem('@favourite-token');
  //     if (values !== null) {
  //       const tokens = JSON.parse(values);
  //       setFavouriteTokens(tokens);
  //       return favouriteTokens;
  //     }
  //     return [];
  //   } catch (e) {
  //     // read error
  //   }
  // };

  // const getFavouriteWorkoutData = async () => {
  //   try {
  //     // need to add token to end of async storage get item
  //     let values = await AsyncStorage.getItem(
  //       `@workout_key-${favouriteTokens[0]}`,
  //     );
  //     if (values !== null) {
  //       const parsedValues = JSON.parse(values);
  //       setFavouriteWorkoutData(parsedValues);
  //     }
  //   } catch (e) {
  //     // read error
  //   }
  // };

  // useEffect(() => {
  //   getFavouriteWorkoutData();
  //   getFavouriteTokens();
  // }, []);

  if (favouriteExerciseData.length === 0 || favouriteWorkoutData.length === 0) {
    return null;
  }

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
      <DataTable>
        <DataTable.Header>
          {headers.map((header: String, index: Number) => {
            return (
              <DataTable.Title style={styles.title} key={`${index}`}>
                <ExerciseSetText>{header}</ExerciseSetText>
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        <FavouriteExerciseData
          item={favouriteWorkoutData[+workoutId]}
          workoutId={workoutId}
        />
      </DataTable>
      <InfoButton onPress={() => addFavouriteSet({workoutId})}>
        <AddText>Add set</AddText>
        <AddIcon name="plus" size={14} color={'rgb(169,169,169)'} />
      </InfoButton>
    </ExerciseView>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    justifyContent: 'center',
  },
});
