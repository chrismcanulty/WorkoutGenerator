import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Header from '../components/styled/header';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View>
      <Header>I am home screen</Header>
    </View>
  );
}
