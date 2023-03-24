import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {SafeAreaView, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function OnboardingScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  return (
    <SafeAreaView>
      <View>
        <Header>I am onboarding screen</Header>
      </View>
    </SafeAreaView>
  );
}
