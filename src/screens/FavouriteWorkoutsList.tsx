import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';

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
  bottom: 0px;
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

export default function FavouriteWorkoutsList({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const {getFavouriteTokens, favouriteTokens, getWorkoutNames, workoutNames} =
    useContext(UserContext);

  useEffect(() => {
    getFavouriteTokens();
    getWorkoutNames();
  }, []);

  if (
    !favouriteTokens ||
    favouriteTokens.length === 0 ||
    !workoutNames ||
    workoutNames.length === 0
  ) {
    // create dummy component based on below informing user there are no favourites yet
    return null;
  }

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      <FlatList
        keyExtractor={item => item}
        contentContainerStyle={{paddingBottom: 200}}
        data={favouriteTokens}
        renderItem={({index, item}) => (
          <Button
            onPress={() =>
              navigation.push('SavedWorkouts', {
                token: favouriteTokens[index],
                title: workoutNames.find((x: any) => x.token === item)?.title,
              })
            }>
            <ButtonText>
              {workoutNames.find((x: any) => x.token === item)?.title}
            </ButtonText>
          </Button>
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
