import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  return (
    <View>
      <Header>Which muscle group would you like to work on?</Header>
    </View>
  );
}
