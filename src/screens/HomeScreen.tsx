import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import questions from '../utils/questions';
import {UserContext} from '../context/User.Context';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

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

// type ItemProps = {
//   id: number;
//   name: string;
//   name_en?: string;
//   is_front: boolean;
//   image_url_main: string;
//   image_url_secondary: string;
// };

// const Item = (props?: ItemProps) => {
//   return props?.name_en ? (
//     <View>
//       <Text>{props.name_en}</Text>
//     </View>
//   ) : null;
// };

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  const {muscleGroup} = useContext(UserContext);
  const [selected, setSelected] = useState('');

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@isOnboarding');
    } catch (err) {
      console.log('Error @clearOnboarding: ', err);
    }
  };

  const sampleData = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];

  // need to add a key based on ID of data

  return (
    <View>
      <Header>{questions[1]}</Header>
      {/* <FlatList
        data={muscleGroup}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Item {...item} />}
      /> */}
      <MultipleSelectList
        setSelected={setSelected}
        data={sampleData}
        save="value"
        boxStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        dropdownStyles={{marginLeft: 20, marginRight: 20, borderRadius: 20}}
        onSelect={() => alert(selected)}
        label="Categories"
      />
      <Button
        style={{marginBottom: 0, padding: 0}}
        onPress={() => navigation.navigate('Equipment')}>
        <ButtonText style={{marginTop: 100, marginBottom: 0, padding: 0}}>
          Next
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
