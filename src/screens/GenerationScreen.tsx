import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native';
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

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <ContainerWrapper>
      <Header>{formatMessage()}</Header>
      <FlatList
        data={exerciseData}
        renderItem={({item}) => <ExerciseItem item={item} />}
        keyExtractor={item => item.id}
      />
    </ContainerWrapper>
  );
}
