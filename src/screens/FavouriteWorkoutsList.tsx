import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useState, useContext} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function FavouriteWorkoutsList({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const [favouriteTokens, setFavouriteTokens] = useState([]);

  const getFavouriteTokens = async () => {
    try {
      let values = await AsyncStorage.getItem('@favourite-token');
      if (values !== null) {
        const favouriteTokens = JSON.parse(values);
        setFavouriteTokens(favouriteTokens);
        return favouriteTokens;
      }
      return [];
    } catch (e) {
      // read error
    }
  };

  // if (favouriteTokens.length === 0) {
  //   return null;
  // }

  useEffect(() => {
    getFavouriteTokens();
  }, []);

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      <FlatList
        keyExtractor={item => item}
        contentContainerStyle={{paddingBottom: 200}}
        data={favouriteTokens}
        renderItem={({item}) => <Text>{item}</Text>}
      />
      <ButtonWrapper>
        <Button onPress={() => navigation.push('Root')}>
          <ButtonText>Home</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
