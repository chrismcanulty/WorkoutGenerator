import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutExercise from '../component/WorkoutExercise';

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
  const [favouriteWorkouts, setFavouriteWorkouts] = useState([]);

  // currently data is stringified in one large object
  // the object contains key value pairs of workoutId and an array of ExerciseSet objects
  // goal is to parse the large object, then populate an array of objects
  // with key value pairs of workoutId and array of ExerciseSet objects
  // want to be able to use flatlist of workout exercises similar to WorkoutsScreen
  // double check the data in that screen and mimic the format before passing in

  // want to render exercise name, muscle and exerciso info
  // and the saved sets for the exercise similar to WorkoutsScreen
  // may need separate API calls to retrieve above info, and use saved
  // favourites data to populate the table

  const getData = async () => {
    try {
      let values = await AsyncStorage.getItem('@storage_Key');
      console.log('valuesvalues', typeof values);
      if (values !== null) {
        const favourites = JSON.parse(values);
        console.log('faves la', favourites.length);
        setFavouriteWorkouts(favourites);
      }
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('favelength', favouriteWorkouts.length);

  if (favouriteWorkouts.length === 0) {
    return null;
  }

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      <FlatList
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 200}}
        data={favouriteWorkouts}
        renderItem={({index, item}) => (
          <WorkoutExercise
            key={+item.id}
            workoutId={+item.id}
            item={item}
            isLastItem={index === favouriteWorkouts.length - 1}
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
