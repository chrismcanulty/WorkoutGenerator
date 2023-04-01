import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import {UserContext} from '../context/User.Context';
import MultipleSelectList from '../component/MultipleSelectList';
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

export default function EquipmentScreen({navigation}: NativeStackHeaderProps) {
  const {selectedEquipment, setSelectedEquipment, equipmentData} =
    useContext(UserContext);
  const [warning, setWarning] = useState(false);

  // if (equipmentTypes.length === 0) return null;

  const onPress = function () {
    if (selectedEquipment.length > 0) {
      navigation.navigate('Reps');
    } else if (selectedEquipment.length === 0) {
      setWarning(true);
    }
  };

  return (
    <View>
      <Header>{questions[1]}</Header>
      <MultipleSelectList
        setSelected={setSelectedEquipment}
        data={equipmentData()}
        save="value"
        boxStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        dropdownStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        onSelect={() => setWarning(false)}
        label="Equipment"
        defaultValues={selectedEquipment}
      />
      {warning && <Warning>{warnings[1]}</Warning>}
      <Button style={{marginBottom: 0, padding: 0}} onPress={onPress}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Next
        </ButtonText>
      </Button>
    </View>
  );
}
