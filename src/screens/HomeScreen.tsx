import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, FlatList, Text} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import {UserContext} from '../context/User.Context';

const Button = styled.TouchableOpacity`
  font-size: 26px;
  margin-top: 5px;
  padding: 10px;
`;
const ButtonText = styled.Text`
  border: 7px solid grey;
  border-radius: 30px;
  font-family: 'Montserrat-Regular';
  font-size: 25px;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;
const Header = styled.Text`
  border: 7px solid grey;
  border-radius: 30px;
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  margin: 20px;
  margin-top: 90px;
  padding: 10px;
  text-align: center;
`;

type ItemProps = {
  id: number;
  name: string;
  name_en?: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
};

const Item = (props?: ItemProps) => {
  return props?.name_en ? (
    <View>
      <Text>{props.name_en}</Text>
    </View>
  ) : null;
};

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup} = useContext(UserContext);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@isOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding: ', err);
    }
  };

  // console.log('muscleGroup', muscleGroup);

  return (
    <View>
      <Header>{questions[1]}</Header>
      <FlatList
        data={muscleGroup}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item {...item} />}
      />
      <Button
        style={{marginBottom: 0, padding: 0}}
        onPress={() => navigation.navigate('MuscleGroup')}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Generate
        </ButtonText>
      </Button>
      <Button
        style={{marginTop: 0, marginBottom: 0, padding: 0}}
        onPress={clearOnboarding}>
        <ButtonText style={{marginTop: 0, marginBottom: 0, padding: 0}}>
          Clear onboarding
        </ButtonText>
      </Button>
    </View>
  );
}
