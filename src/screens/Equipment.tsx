import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import questions from '../utils/questions';
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

export default function EquipmentScreen({navigation}: NativeStackHeaderProps) {
  const {equipmentTypes, setSelectedEquipment} = useContext(UserContext);

  const equipmentData = () => {
    const temp = [];
    for (const equipment of equipmentTypes as any) {
      if (equipment.name) {
        temp.push({...equipment, key: equipment.id, value: equipment.name});
      }
    }
    return temp;
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
        // onSelect={selected => setSelectedMuscles(selected)}
        label="Categories"
      />
      <Button
        style={{marginBottom: 0, padding: 0}}
        onPress={() => navigation.navigate('Reps')}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Next
        </ButtonText>
      </Button>
    </View>
  );
}
