import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function RepsScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  return (
    <View>
      <Header>I am reps screen</Header>
    </View>
  );
}
