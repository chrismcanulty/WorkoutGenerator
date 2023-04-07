import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

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
      <Header>I am generation screen</Header>
    </View>
  );
}
