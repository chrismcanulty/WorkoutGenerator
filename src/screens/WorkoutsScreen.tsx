import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList, View} from 'react-native';
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';

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

  // create new component to render in flatlist in place of exerciseitem component
  // generate a list of sets for each exercise with completion status icon
  // can mark off each set as complete by clicking
  // from within the list toggle reps/distance and weight/time
  // based on input of above, entry format of numbers will differ
  // option to add set below last set in exercise with 'add set' button
  // option to delete set below last set in exercise with 'delete set' button

  return (
    <View>
      <Header>My Workout</Header>
      <FlatList
        contentContainerStyle={{paddingBottom: 200}}
        data={exerciseData}
        renderItem={({index, item}) => (
          <WorkoutExercise
            item={item}
            isLastItem={index === exerciseData.length - 1}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
