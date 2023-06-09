import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Alert, Dimensions, FlatList, Modal, View} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const InnerModalView = styled.View`
  background-color: #fff;
  border-radius: 15px;
  height: ${Dimensions.get('window').height * 0.5}px;
  padding: 10px;
  width: ${Dimensions.get('window').width * 0.9}px;
`;
const OuterModalView = styled.View`
  align-items: center;
  background-color: rgba(80, 80, 80, 0.1);
  flex: 1;
  justify-content: center;
`;
const ModalHeader = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 24px;
  margin: 20px;
  padding: 18px;
  text-align: center;
`;
const ModalTextInput = styled.TextInput`
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
const ModalView = styled.View`
  padding: 10px;
`;

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');
  const {exerciseData, clearWorkout, workout} = useContext(UserContext);

  const getFavouriteTokens = async () => {
    try {
      let values = await AsyncStorage.getItem('@favourite-token');
      if (values !== null) {
        const favouriteTokens = JSON.parse(values);
        return favouriteTokens;
      }
      return [];
    } catch (e) {
      // read error
    }
  };

  const saveToken = async () => {
    const randomToken = () => {
      return Date.now() + Math.random();
    };

    const newFavouriteToken = randomToken();

    try {
      // first get favourite tokens stored in async storage, if any
      let values = await getFavouriteTokens();
      let updatedFavourites = [...values];
      // remove oldest workout token from array if there are too many favourite workouts
      // for now set to three for simplicity
      if (updatedFavourites.length >= 3) {
        updatedFavourites.shift();
        // also need to remove excess exerise list/workouts
      }
      // add new favourite workout token to the list
      updatedFavourites.push(newFavouriteToken);
      const jsonValue = JSON.stringify(updatedFavourites);
      await AsyncStorage.setItem('@favourite-token', jsonValue);
      try {
        const exerciseJson = JSON.stringify(exerciseData);
        await AsyncStorage.setItem(
          `@exercise_key-${newFavouriteToken}`,
          exerciseJson,
        );

        try {
          const workoutJson = JSON.stringify(workout);

          await AsyncStorage.setItem(
            `@workout_key-${newFavouriteToken}`,
            workoutJson,
          );
        } catch (e) {
          // saving error
        }
      } catch (e) {
        // saving error
      }
    } catch (e) {
      // saving error
    }
  };

  // need to add text input box, have logic that saves token once
  // text input form has been completed
  // save workout name as key value pair with workout token?

  return (
    <ContainerWrapper>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <OuterModalView>
          <InnerModalView>
            <ModalHeader>Input workout name</ModalHeader>
            <ModalView>
              <ModalTextInput
                onChangeText={onChangeText}
                value={text}
                placeholder="My workout"
              />
            </ModalView>
            <Button onPress={() => setModalVisible(false)}>
              <ButtonText>Confirm</ButtonText>
            </Button>
            <Button onPress={() => setModalVisible(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </InnerModalView>
        </OuterModalView>
      </Modal>
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
        <Button onPress={() => setModalVisible(true)}>
          <ButtonText>Modal</ButtonText>
        </Button>
        <Button
          onPress={async () => {
            await saveToken();
          }}>
          <ButtonText>Add to favourites</ButtonText>
        </Button>
        <Button
          onPress={() => {
            clearWorkout({navigation});
          }}>
          <ButtonText>Complete Workout</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}
