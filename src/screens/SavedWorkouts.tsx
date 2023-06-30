import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../context/User.Context';
import FavouriteWorkout from '../component/FavouriteWorkout';
import {useHeaderHeight} from '@react-navigation/elements';

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
  route,
}: {
  navigation: NativeStackHeaderProps;
  route: any;
  children?: JSX.Element | JSX.Element[];
}) {
  const {
    favouriteWorkoutData,
    setFavouriteWorkoutData,
    favouriteExerciseData,
    setFavouriteExerciseData,
    getFavouriteTokens,
  } = useContext(UserContext);

  const token = route.params.token;

  const title = route.params.title;

  const getFavouriteExerciseData = async () => {
    try {
      let values = await AsyncStorage.getItem(`@exercise_key-${token}`);
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
      let tokens = await getFavouriteTokens();
      let values = await AsyncStorage.getItem(`@workout_key-${token}`);
      if (values !== null && tokens !== null) {
        const parsedValues = JSON.parse(values);
        setFavouriteWorkoutData(parsedValues);
      }
    } catch (e) {
      // read error
    }
  };

  const height = useHeaderHeight();

  useEffect(() => {
    getFavouriteTokens();
    getFavouriteExerciseData();
    getFavouriteWorkoutData();
  }, []);

  if (favouriteExerciseData.length === 0 || favouriteWorkoutData.length === 0) {
    return null;
  }

  return (
    <ContainerWrapper>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior="padding"
        style={{flex: 1}}
        enabled>
        <Header>{title}</Header>
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
          <Button
            onPress={() => {
              setFavouriteExerciseData([]);
              navigation.push('Root');
            }}>
            <ButtonText>Home</ButtonText>
          </Button>
        </ButtonWrapper>
      </KeyboardAvoidingView>
    </ContainerWrapper>
  );
}
