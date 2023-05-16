import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
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

export default function SavedWorkouts({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const [favouriteWorkouts, setFavouriteWorkouts] = useState<string[]>([]);

  const getData = async () => {
    try {
      const favourites = await AsyncStorage.getItem('@storage_Key');
      if (favourites !== null) {
        setFavouriteWorkouts([favourites]);
      }
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('fave', favouriteWorkouts);

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      {favouriteWorkouts.map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
      <ButtonWrapper>
        <Button onPress={() => navigation.push('Root')}>
          <ButtonText>Home</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
