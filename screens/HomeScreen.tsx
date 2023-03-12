import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React from 'react';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  return (
    <View>
      <Text>I am home screen</Text>
    </View>
  );
}
