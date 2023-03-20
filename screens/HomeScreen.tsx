import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Header>I am home screen</Header>
    </View>
  );
}
