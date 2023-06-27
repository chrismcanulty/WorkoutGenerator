import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Alert, Dimensions, FlatList, Modal, View} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompleteIcon from 'react-native-vector-icons/FontAwesome5';
import warnings from '../utils/warnings';

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
const Warning = styled.Text`
  border: 2px solid red;
  border-radius: 10px;
  color: red;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  margin: 20px;
  margin-top: 0px;
  padding: 10px;
  text-align: center;
`;

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutSaved, setWorkoutSaved] = useState(false);
  const [addFavouritesVisible, setAddFavouritesVisible] = useState(true);
  const [minCharWarning, setMinCharWarning] = useState(false);
  const [text, onChangeText] = useState('');
  const {exerciseData, clearWorkout, workout, title, setTitle} =
    useContext(UserContext);

  // add code to onConfirm function to warn user if there are already max number of workouts
  // need to retrieve number of workouts from UserContext

  const onConfirm = async () => {
    setTitle(text);
    if (text.length < 3) {
      setMinCharWarning(true);
    } else if (text.length >= 3) {
      try {
        let values = await getFavouriteTokens();
        if (values.length >= 3) {
          createTwoButtonAlert();
        } else {
          try {
            await saveToken();
            setModalVisible(false);
            setWorkoutSaved(true);
            setAddFavouritesVisible(false);
          } catch (e) {
            // read error
          }
        }
      } catch (e) {
        // read error
      }
    }
  };

  const closeConfirm = () => {
    setWorkoutSaved(false);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Max Favourites Reached',
      'Ok to overwrite oldest favourite workout?',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );

  const modalPopup = () => {
    const titleText = text || 'My workout';
    setTitle(titleText);
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
    setMinCharWarning(false);
  };

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

  const getWorkoutNames = async () => {
    try {
      let values = await AsyncStorage.getItem('@workout-names');
      if (values !== null) {
        const workoutNames = JSON.parse(values);
        return workoutNames;
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
    setTitle(text);

    try {
      let values = await getWorkoutNames();
      let updatedWorkoutNames = [...values];
      if (updatedWorkoutNames.length >= 3) {
        updatedWorkoutNames.shift();
      }

      updatedWorkoutNames.push({token: newFavouriteToken, title: text});
      const jsonValue = JSON.stringify(updatedWorkoutNames);
      await AsyncStorage.setItem('@workout-names', jsonValue);
    } catch (e) {
      // saving error
    }

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

  // 1. confirm with user that oldest workout will be overwritten and provide option to abort
  // in case max number of workouts has been reached
  // 2. add limit to number of characters and conditionally render warning message,
  // prevent user from saving workout name that is too long

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
            <Button onPress={onConfirm}>
              <ButtonText>Confirm</ButtonText>
            </Button>
            <Button onPress={onCancel}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            {minCharWarning && <Warning>{warnings[3]}</Warning>}
          </InnerModalView>
        </OuterModalView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={workoutSaved}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setWorkoutSaved(!workoutSaved);
        }}>
        <OuterModalView>
          <InnerModalView>
            <ModalHeader>New Workout {`'${title}'`} Saved!</ModalHeader>
            <View style={{flex: 1, alignItems: 'center'}}>
              <CompleteIcon
                name="check-circle"
                size={Dimensions.get('window').height * 0.175}
                color={'green'}
              />
            </View>
            <Button onPress={closeConfirm}>
              <ButtonText>Ok</ButtonText>
            </Button>
          </InnerModalView>
        </OuterModalView>
      </Modal>
      <Header>{title}</Header>
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
        {/* {addFavouritesVisible && ( */}
        <Button onPress={modalPopup}>
          <ButtonText>Add to favourites</ButtonText>
        </Button>
        {/* )} */}
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
