import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, FlatList, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';

const Header = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  margin: 20px;
  margin-top: 30px;
  padding: 18px;
  text-align: center;
`;

export default function GenerationScreen({navigation}: NativeStackHeaderProps) {
  const {
    selectedMuscles,
    selectedEquipment,
    numberOfExercises,
    exerciseData,
    setExerciseData,
    fetchExercises,
  } = useContext(UserContext);

  const filterLanguage = exerciseData.filter(
    (exercise: any) => exercise.language === 2,
  );

  // console.log(
  //   'test call',
  //   filterLanguage.map((exercise: any) => exercise.name),
  // );
  // console.log('muscles', selectedMuscles);
  // console.log('equipment', selectedEquipment);

  const formatMessage = function () {
    if (selectedMuscles.length === 0) {
      return 'We were unable to retrieve any exercises for you :(';
    } else if (selectedMuscles.length === 1) {
      return `We've generated this ${filterLanguage.length} exercise for you!`;
    } else {
      return `We've generated these ${filterLanguage.length} exercises for you!`;
    }
  };

  const Item = ({title}: ItemProps) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <View>
      <Header>{formatMessage()}</Header>
      <FlatList
        data={exerciseData}
        renderItem={({item}) => <Item title={item.name} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
