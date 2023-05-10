import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList, View} from 'react-native';
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';

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

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const {exerciseData} = useContext(UserContext);

  return (
    <ContainerWrapper>
      <Header>My Workout</Header>
      <FlatList
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 200}}
        data={exerciseData}
        renderItem={({index, item}) => (
          <WorkoutExercise
            key={+item.id}
            workoutId={+item.id}
            item={item}
            isLastItem={index === exerciseData.length - 1}
          />
        )}
      />
      <ButtonWrapper>
        <Button>
          <ButtonText>Add to favourites</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Root')}>
          <ButtonText>Complete Workout</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
