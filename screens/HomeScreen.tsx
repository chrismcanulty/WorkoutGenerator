import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View>
      <Text>I am home screen</Text>
    </View>
  );
}
