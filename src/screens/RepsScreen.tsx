import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';
import questions from '../utils/questions';
import warnings from '../utils/warnings';
import {UserContext} from '../context/User.Context';

const Button = styled.TouchableOpacity`
  font-size: 24px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;
const Header = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  margin: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: center;
`;
const Warning = styled.Text`
  border: 2px solid red;
  border-radius: 10px;
  color: red;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  margin: 20px;
  margin-top: 0px;
  padding: 10px;
  text-align: center;
`;
const ButtonWrapper = styled.View`
  background-color: white;
  bottom: 80px;
  position: absolute;
  width: 100%;
`;
const ContainerWrapper = styled.ScrollView`
  background-color: white;
  height: 100%;
`;

export default function RepsScreen({navigation}: NativeStackHeaderProps) {
  const {numberOfExercises, setNumberOfExercises} = useContext(UserContext);
  const [warning, setWarning] = useState(false);

  const onPress = function () {
    if (numberOfExercises !== '0') {
      navigation.navigate('Generation');
    } else if (numberOfExercises === '0') {
      setWarning(true);
    }
  };

  const pickerItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <View>
      <ContainerWrapper>
        <Header>{questions[2]}</Header>
        <Picker
          style={styles.pickerStyles}
          selectedValue={numberOfExercises}
          onValueChange={itemValue => {
            setNumberOfExercises(itemValue);
            if (itemValue !== '0') {
              setWarning(false);
            }
          }}>
          {pickerItems.map(item => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {warning && <Warning>{warnings[2]}</Warning>}
      </ContainerWrapper>
      <ButtonWrapper>
        <Button onPress={onPress}>
          <ButtonText>Generate</ButtonText>
        </Button>
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerStyles: {
    marginTop: 50,
  },
});
