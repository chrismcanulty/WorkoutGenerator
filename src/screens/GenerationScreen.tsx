import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList, Dimensions} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import ExerciseItem from '../component/ExerciseItem';

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
  bottom: 5px;
  position: absolute;
  width: 100%;
  flex: 1;
`;
const ContainerWrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
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
const LoadingView = styled.View`
  margin-top: ${Dimensions.get('window').height * 0.15}px;
`;

export default function GenerationScreen({navigation}: NativeStackHeaderProps) {
  const {exerciseData, fetchExercises, loadingExercises} =
    useContext(UserContext);

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

  if (loadingExercises) {
    return (
      <ContainerWrapper>
        <Header>Generating...</Header>
        <LoadingView>
          <ActivityIndicator size="large" />
        </LoadingView>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <Header>{formatMessage()}</Header>
      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={exerciseData}
        renderItem={({index, item}) => (
          <ExerciseItem
            item={item}
            isLastItem={index === exerciseData.length - 1}
          />
        )}
        keyExtractor={item => item.id}
      />
      <ButtonWrapper>
        <Button onPress={() => navigation.push('Workouts')}>
          <ButtonText>Start Workout</ButtonText>
        </Button>
        <Button onPress={onPress}>
          <ButtonText>Regenerate</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
