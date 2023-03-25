import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function OnboardingScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;
  const clearOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@isOnboarding', 'false');
      console.log('lalala');
    } catch (err) {
      console.log('Error @setItem: ', err);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Header>I am onboarding screen</Header>
        <TouchableOpacity onPress={clearOnboarding}>
          <Text>Clear Onboarding</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
