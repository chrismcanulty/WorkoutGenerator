import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import {UserContext} from '../context/User.Context';
import MultipleSelectList from '../component/MultipleSelectList';
import warnings from '../utils/warnings';

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

export default function EquipmentScreen({navigation}: NativeStackHeaderProps) {
  const {selectedEquipment, setSelectedEquipment, equipmentData} =
    useContext(UserContext);
  const [warning, setWarning] = useState(false);

  const onPress = function () {
    if (selectedEquipment.length > 0) {
      navigation.navigate('Reps');
    } else if (selectedEquipment.length === 0) {
      setWarning(true);
    }
  };

  return (
    <View>
      <ContainerWrapper>
        <Header>{questions[1]}</Header>
        <MultipleSelectList
          setSelected={setSelectedEquipment}
          data={equipmentData()}
          save="value"
          boxStyles={styles.boxStyles}
          dropdownStyles={styles.dropdownStyles}
          dropdownTextStyles={styles.dropdownTextStyles}
          onSelect={() => setWarning(false)}
          label="Equipment"
          defaultValues={selectedEquipment}
        />
        {warning && <Warning>{warnings[1]}</Warning>}
      </ContainerWrapper>
      <ButtonWrapper>
        <Button onPress={onPress}>
          <ButtonText>Next</ButtonText>
        </Button>
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  boxStyles: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(230, 230, 230)',
  },
  dropdownStyles: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgb(230, 230, 230)',
  },
  dropdownTextStyles: {
    color: 'rgb(38, 38, 38)',
    fontFamily: 'Montserrat-Regular',
  },
});
