import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const Button = styled.TouchableOpacity`
    font-size: 26px;
    margin-top: 50px;
    padding: 10px;
  `;
  const ButtonText = styled.Text`
    border: 5px solid grey;
    border-radius: 5px;
    font-family: 'Montserrat-Regular';
    font-size: 25px;
    margin: 35px;
    padding: 10px;
    text-align: center;
  `;
  const Header = styled.Text`
    border: 5px solid grey;
    border-radius: 5px;
    font-family: 'Montserrat-Regular';
    font-size: 35px;
    margin: 35px;
    margin-top: 70px;
    padding: 10px;
    text-align: center;
  `;

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Header>Workout Generator</Header>
      {/* replace navigation with modal? */}
      <Button onPress={() => navigation.navigate('MuscleGroup')}>
        <ButtonText>Generate</ButtonText>
      </Button>
    </View>
  );
}
