import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import ExerciseItem from '../component/ExerciseItem';

const Header = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  margin: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: center;
`;
const ContainerWrapper = styled.View`
  background-color: white;
  height: 100%;
`;
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
const ButtonWrapper = styled.View`
  background-color: white;
  bottom: 80px;
  position: absolute;
  width: 100%;
`;

export default function GenerationScreen({navigation}: NativeStackHeaderProps) {
  const {exerciseData, fetchExercises} = useContext(UserContext);

  const formatMessage = function () {
    if (!exerciseData) {
      return 'We were unable to retrieve any exercises for you :(';
    } else if (exerciseData.length === 1) {
      return `We've generated this ${exerciseData.length} exercise for you!`;
    } else {
      return `We've generated these ${exerciseData.length} exercises for you!`;
    }
  };

  const onPress = function () {
    fetchExercises();
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <>
      <ContainerWrapper>
        <Header>{formatMessage()}</Header>
        <FlatList
          data={exerciseData}
          renderItem={({item}) => <ExerciseItem item={item} />}
          keyExtractor={item => item.id}
        />
      </ContainerWrapper>
      <ButtonWrapper>
        <Button onPress={onPress}>
          <ButtonText>Regenerate</ButtonText>
        </Button>
      </ButtonWrapper>
    </>
  );
}
