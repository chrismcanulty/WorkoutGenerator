import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import questions from '../utils/questions';

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  return (
    <View>
      <Header>{questions[1]}</Header>
    </View>
  );
}
