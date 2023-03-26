import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const Button = styled.TouchableOpacity`
    font-size: 26px;
    margin-top: 50px;
    padding: 10px;
  `;
  const ButtonText = styled.Text`
    border: 5px solid grey;
    border-radius: 5px;
    font-family: 'Montserrat-Regular';
    font-size: 25px;
    margin: 35px;
    padding: 10px;
    text-align: center;
  `;
  const Header = styled.Text`
    border: 5px solid grey;
    border-radius: 5px;
    font-family: 'Montserrat-Regular';
    font-size: 35px;
    margin: 35px;
    margin-top: 70px;
    padding: 10px;
    text-align: center;
  `;

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@isOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding: ', err);
    }
  };

  return (
    <View>
      <Header>Workout Generator</Header>
      {/* replace navigation with modal? */}
      <Button onPress={() => navigation.navigate('MuscleGroup')}>
        <ButtonText>Generate</ButtonText>
      </Button>
      <TouchableOpacity onPress={clearOnboarding}>
        <Text>Clear onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}
