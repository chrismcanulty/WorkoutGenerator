import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';
import questions from '../utils/questions';
import warnings from '../utils/warnings';

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

export default function RepsScreen({navigation}: NativeStackHeaderProps) {
  const [numberOfExercises, setNumberOfExercises] = useState('0');
  const [warning, setWarning] = useState(false);

  const onPress = function () {
    if (numberOfExercises !== '0') {
      navigation.navigate('Generation');
    } else if (numberOfExercises === '0') {
      setWarning(true);
    }
  };

  return (
    <View>
      <Header>{questions[2]}</Header>
      <Picker
        selectedValue={numberOfExercises}
        onValueChange={itemValue => {
          setNumberOfExercises(itemValue);
          if (itemValue !== '0') {
            setWarning(false);
          }
        }}>
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      {warning && <Warning>{warnings[2]}</Warning>}
      <Button style={{marginBottom: 0, padding: 0}} onPress={onPress}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Generate
        </ButtonText>
      </Button>
    </View>
  );
}
