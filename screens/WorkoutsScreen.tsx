import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React from 'react';

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  return (
    <View>
      <Text>I am workouts screen</Text>
    </View>
  );
}
