import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext, useState} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutExercise from '../component/WorkoutExercise';
import {UserContext} from '../context/User.Context';
import FavouriteWorkout from '../component/FavouriteWorkout';

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

export default function SavedWorkouts({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const {
    favouriteWorkoutData,
    setFavouriteWorkoutData,
    favouriteExerciseData,
    setFavouriteExerciseData,
  } = useContext(UserContext);

  const getFavouriteExerciseData = async () => {
    try {
      let values = await AsyncStorage.getItem('@exercise_key');
      if (values !== null) {
        const favourites = JSON.parse(values);
        setFavouriteExerciseData(favourites);
      }
    } catch (e) {
      // read error
    }
  };

  const getFavouriteWorkoutData = async () => {
    try {
      let values = await AsyncStorage.getItem('@workout_key');
      if (values !== null) {
        const parsedValues = JSON.parse(values);
        setFavouriteWorkoutData(parsedValues);
      }
    } catch (e) {
      // read error
    }
  };

  useEffect(() => {
    getFavouriteExerciseData();
    getFavouriteWorkoutData();
  }, []);

  if (favouriteExerciseData.length === 0 || favouriteWorkoutData.length === 0) {
    return null;
  }

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      <FlatList
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 200}}
        data={favouriteExerciseData}
        renderItem={({index, item}) => (
          <FavouriteWorkout
            favouriteWorkout={favouriteWorkoutData}
            key={+item.id}
            workoutId={+item.id}
            item={item}
            isLastItem={index === favouriteExerciseData.length - 1}
          />
        )}
      />
      <ButtonWrapper>
        <Button onPress={() => navigation.push('Root')}>
          <ButtonText>Home</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
