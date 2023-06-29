import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext} from 'react';
import {FlatList, Dimensions, ActivityIndicator} from 'react-native';
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
const LoadingView = styled.View`
  margin-top: ${Dimensions.get('window').height * 0.15}px;
`;

export default function FavouriteWorkoutsList({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const {
    getFavouriteTokens,
    favouriteTokens,
    getWorkoutNames,
    workoutNames,
    loadingFavourites,
  } = useContext(UserContext);

  useEffect(() => {
    getFavouriteTokens();
    getWorkoutNames();
  }, []);

  if (loadingFavourites) {
    return (
      <ContainerWrapper>
        <Header>Loading...</Header>
        <LoadingView>
          <ActivityIndicator size="large" />
        </LoadingView>
      </ContainerWrapper>
    );
  }

  if (
    !favouriteTokens ||
    favouriteTokens.length === 0 ||
    !workoutNames ||
    workoutNames.length === 0
  ) {
    // create dummy component based on below informing user there are no favourites yet
    return (
      <ContainerWrapper>
        <Header>No favourites yet, please add some!</Header>
        <ButtonWrapper>
          <Button onPress={() => navigation.push('Root')}>
            <ButtonText>Home</ButtonText>
          </Button>
        </ButtonWrapper>
      </ContainerWrapper>
    );
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
