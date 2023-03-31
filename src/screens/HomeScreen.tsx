import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import warnings from '../utils/warnings';
import {UserContext} from '../context/User.Context';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

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
const Warning = styled.Text`
  border: 3px solid red;
  border-radius: 20px;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  color: red;
  margin: 20px;
  margin-top: 0px;
  padding: 10px;
  text-align: center;
`;

// type ItemProps = {
//   id: number;
//   name: string;
//   name_en: string;
//   is_front: boolean;
//   image_url_main: string;
//   image_url_secondary: string;
// };

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup, selectedMuscles, setSelectedMuscles} =
    useContext(UserContext);
  const [warning, setWarning] = useState(false);

  if (muscleGroup.length === 0) return null;

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@isOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding: ', err);
    }
  };

  const muscleGroupData = () => {
    const temp = [];
    for (const muscle of muscleGroup as any) {
      if (muscle.name_en) {
        temp.push({...muscle, key: muscle.id, value: muscle.name_en});
      }
    }
    return temp;
  };

  return (
    <View>
      <Header>{questions[0]}</Header>
      <MultipleSelectList
        setSelected={setSelectedMuscles}
        data={muscleGroupData()}
        save="value"
        boxStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        dropdownStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        // onSelect={selected => setSelectedMuscles(selected)}
        label="Categories"
      />
      {warning && <Warning>{warnings[0]}</Warning>}
      <Button
        style={{marginBottom: 0, padding: 0}}
        onPress={() => {
          if (selectedMuscles.length > 0) {
            navigation.navigate('Equipment');
          } else if (selectedMuscles.length === 0) {
            setWarning(true);
          }
        }}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Next
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
