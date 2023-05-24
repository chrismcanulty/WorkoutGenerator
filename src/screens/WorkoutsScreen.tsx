import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native';
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = styled.TouchableOpacity`
  font-size: 24px;
  padding: 10px;
`;
const ButtonText = styled.Text`
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
const ButtonWrapper = styled.View`
  background-color: white;
  bottom: 5px;
  position: absolute;
  width: 100%;
  flex: 1;
`;
const ContainerWrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
`;
const Header = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  margin: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: center;
`;

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const {exerciseData, clearWorkout, workout} = useContext(UserContext);

  // console.log('date identifier', Date.now() + Math.random());

  // create and store same token to attach to both exercise and workout data
  //

  const randomToken = () => {
    return Date.now() + Math.random();
  };

  const newFavouriteToken = randomToken();

  // need to get all the values of @favourite-token array, then spread operate and add
  // to this array. Once complete, set the updated value to @favourite-token via Async storage

  const getFavouriteTokens = async () => {
    try {
      let values = await AsyncStorage.getItem('@favourite-token');
      if (values !== null) {
        const favouriteTokens = JSON.parse(values);
        return favouriteTokens;
      }
      return [];
    } catch (e) {
      // read error
    }
  };

  const saveToken = async () => {
    try {
      // first get favourite tokens stored in async storage, if any
      let values = await getFavouriteTokens();
      let updatedFavourites = [...values];
      // remove oldest workout token from array if there are too many favourite workouts
      if (updatedFavourites.length >= 10) {
        updatedFavourites.shift();
        // also need to remove excess exerise list/workouts
      }
      // add new favourite workout token to the list
      // updatedFavourites.shift();
      // updatedFavourites.shift();
      updatedFavourites.push(newFavouriteToken);
      const jsonValue = JSON.stringify(updatedFavourites);
      console.log('myfaves', updatedFavourites);
      await AsyncStorage.setItem('@favourite-token', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeExerciseData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        `@exercise_key-${newFavouriteToken}`,
        jsonValue,
      );
    } catch (e) {
      // saving error
    }
  };

  const storeWorkoutData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(
        `@workout_key-${newFavouriteToken}`,
        jsonValue,
      );
    } catch (e) {
      // saving error
    }
  };

  return (
    <ContainerWrapper>
      <Header>My Workout</Header>
      <FlatList
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 200}}
        data={exerciseData}
        renderItem={({index, item}) => (
          <WorkoutExercise
            key={+item.id}
            workoutId={+item.id}
            item={item}
            isLastItem={index === exerciseData.length - 1}
          />
        )}
      />
      <ButtonWrapper>
        <Button
          onPress={() => {
            storeExerciseData(exerciseData);
            storeWorkoutData(workout);
            saveToken();
          }}>
          <ButtonText>Add to favourites</ButtonText>
        </Button>
        <Button
          onPress={() => {
            clearWorkout({navigation});
          }}>
          <ButtonText>Complete Workout</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
