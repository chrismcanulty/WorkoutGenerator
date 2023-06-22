import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import warnings from '../utils/warnings';
import {UserContext} from '../context/User.Context';
import {MultipleSelectList} from '../component/MultipleSelectList';
import {useFocusEffect} from '@react-navigation/native';

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
  bottom: 0;
  position: absolute;
  width: 100%;
`;
const ContainerWrapper = styled.ScrollView`
  background-color: white;
  height: 100%;
`;
const SpinnerWrapper = styled.View`
  background-color: white;
  flex: 1;
  justify-content: center;
  align-item: center;
`;

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup, selectedMuscles, setSelectedMuscles, loading} =
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
      navigation.push('Equipment');
    } else if (selectedMuscles.length === 0) {
      setWarning(true);
    }
  };

  if (loading) {
    return (
      <SpinnerWrapper>
        <ActivityIndicator size="small" color="#0000ff" />
      </SpinnerWrapper>
    );
  }

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
  dropdownTextStyles: {
    color: 'rgb(38, 38, 38)',
    fontFamily: 'Montserrat-Regular',
  },
});
