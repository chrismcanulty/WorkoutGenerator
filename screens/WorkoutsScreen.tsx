import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';
import Header from '../components/styled/header';

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  return (
    <View>
      <Header>I am workouts screen</Header>
    </View>
  );
}
