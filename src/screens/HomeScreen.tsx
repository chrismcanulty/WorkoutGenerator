import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import warnings from '../utils/warnings';
import {UserContext} from '../context/User.Context';
import {MultipleSelectList} from '../component/MultipleSelectList';

const Button = styled.TouchableOpacity`
  font-size: 24px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  color: rgb(38, 38, 38);
  margin: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 10px;
  text-align: center;
`;
const Header = styled.Text`
  border: 2px rgb(230, 230, 230);
  border-radius: 15px;
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  color: rgb(38, 38, 38);
  margin: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: center;
`;
const Warning = styled.Text`
  border: 2px solid red;
  border-radius: 10px;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  color: red;
  margin: 20px;
  margin-top: 0px;
  padding: 10px;
`;
const ButtonWrapper = styled.View`
  flex: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
`;
const ContainerWrapper = styled.ScrollView`
  background-color: white;
  height: 100%;
`;

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup, selectedMuscles, setSelectedMuscles} =
    useContext(UserContext);
  const [warning, setWarning] = useState(false);

  // Clear onboarding function and button - keep for testing purposes to test onboarding flow
  // const clearOnboarding = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@isOnboarding');
  //   } catch (err) {
  //     console.log('Error @clearOnboarding: ', err);
  //   }
  // };

  const muscleGroupData = () => {
    const temp = [];
    for (const muscle of muscleGroup as any) {
      if (muscle.name_en) {
        temp.push({...muscle, key: muscle.id, value: muscle.name_en});
      }
    }
    return temp;
  };

  const onPress = function () {
    if (selectedMuscles.length > 0) {
      navigation.navigate('Equipment');
    } else if (selectedMuscles.length === 0) {
      setWarning(true);
    }
  };

  return (
    <>
      <ContainerWrapper>
        <Header>{questions[0]}</Header>
        <View>
          <MultipleSelectList
            setSelected={setSelectedMuscles}
            data={muscleGroupData()}
            save="value"
            boxStyles={styles.boxStyles}
            dropdownStyles={styles.dropdownStyles}
            dropdownItemStyles={styles.dropdownItemStyles}
            dropdownTextStyles={styles.dropdownTextStyles}
            onSelect={() => setWarning(false)}
            label="Muscle groups"
            defaultValues={selectedMuscles}
          />
          {warning && <Warning>{warnings[0]}</Warning>}
        </View>
      </ContainerWrapper>
      <ButtonWrapper>
        <Button onPress={onPress}>
          <ButtonText>Next</ButtonText>
        </Button>
        {/* <Button onPress={clearOnboarding}>
          <ButtonText>Clear onboarding</ButtonText>
        </Button> */}
      </ButtonWrapper>
    </>
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
  dropdownItemStyles: {},
  dropdownTextStyles: {
    color: 'rgb(38, 38, 38)',
    fontFamily: 'Montserrat-Regular',
  },
});
