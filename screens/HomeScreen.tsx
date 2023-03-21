import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Button, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
    font-size: 26px;
    margin: 35px;
    padding: 10px;
    border: 5px solid grey;
    border-radius: 5px;
    text-align: center;
  `;

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Header>Workout Generator</Header>
      <Button title="Press me" onPress={() => alert('Simple Button pressed')} />
    </View>
  );
}
