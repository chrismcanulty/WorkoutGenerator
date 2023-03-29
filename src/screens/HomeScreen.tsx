import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import {UserContext} from '../context/User.Context';

const Button = styled.TouchableOpacity`
  font-size: 26px;
  margin-top: 5px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  border: 7px solid grey;
  border-radius: 30px;
  font-family: 'Montserrat-Regular';
  font-size: 25px;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;
const Header = styled.Text`
  border: 7px solid grey;
  border-radius: 30px;
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  margin: 20px;
  margin-top: 90px;
  padding: 10px;
  text-align: center;
`;
export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup} = useContext(UserContext);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@isOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding: ', err);
    }
  };

  console.log('muscleGroup', muscleGroup);
  return (
    <View>
      <Header>{questions[1]}</Header>
      <Button
        style={{marginBottom: 0, padding: 0}}
        onPress={() => navigation.navigate('MuscleGroup')}>
        <ButtonText style={{marginTop: 220, marginBottom: 0, padding: 0}}>
          Generate
        </ButtonText>
      </Button>
      <Button
        style={{marginTop: 0, marginBottom: 0, padding: 0}}
        onPress={clearOnboarding}>
        <ButtonText style={{marginTop: 0, marginBottom: 0, padding: 0}}>
          Clear onboarding
        </ButtonText>
      </Button>
    </View>
  );
}
