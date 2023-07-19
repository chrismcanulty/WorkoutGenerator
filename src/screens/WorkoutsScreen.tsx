import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import WorkoutExercise from '../component/WorkoutExercise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompleteIcon from 'react-native-vector-icons/FontAwesome5';
import warnings from '../utils/warnings';
import {useHeaderHeight} from '@react-navigation/elements';

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
  bottom: 0px;
  position: absolute;
  width: 100%;
  flex: 1;
`;
const CompleteIconView = styled.View`
  align-items: center;
  flex: 1;
`;
const ConfirmInnerModalView = styled.View`
  background-color: #fff;
  border-radius: 15px;
  height: ${Dimensions.get('window').height * 0.45}px;
  padding: 10px;
  width: ${Dimensions.get('window').width * 0.9}px;
`;
const ContainerWrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
`;
const CreateWorkoutSeparator = styled.View`
  border-color: rgb(230, 230, 230);
  border-left-width: 1px;
`;
const CancelCreateWorkoutText = styled.Text`
  border-color: rgb(230, 230, 230);
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 20px;
  padding-bottom: 20px;
  padding-top: 10px;
  text-align: center;
`;
const CreateWorkoutText = styled.Text`
  border-color: rgb(230, 230, 230);
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Bold';
  font-size: 20px;
  padding-bottom: 20px;
  padding-top: 10px;
  text-align: center;
`;
const CreateWorkoutView = styled.View`
  border-color: rgb(230, 230, 230);
  border-top-width: 1px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
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
  height: 260px;
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
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  text-align: center;
`;
const ModalSpace = styled.Text`
  background-color: white;
  border: 2px solid transparent;
  border-radius: 10px;
  color: transparent;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 2px;
  padding: 10px;
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
  padding-top: 10px;
`;
const Warning = styled.Text`
  background-color: white;
  border: 2px solid red;
  border-radius: 10px;
  color: red;
  font-family: 'Montserrat-Regular';
  font-size: 12px;
  margin-bottom: 2px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  padding: 10px;
  text-align: center;
`;

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutSaved, setWorkoutSaved] = useState(false);
  const [addFavouritesVisible, setAddFavouritesVisible] = useState(true);
  const [warning, setWarning] = useState('');
  const [text, onChangeText] = useState('');
  const {exerciseData, clearWorkout, workout, title, setTitle} =
    useContext(UserContext);

  const onConfirm = async () => {
    if (text.length < 3) {
      setWarning('3');
    } else if (text.length >= 20) {
      setWarning('4');
    } else if (text.length >= 3 && text.length < 20) {
      setWarning('');
      setTitle(text);
      try {
        let values = await getFavouriteTokens();
        if (values.length >= 10) {
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
        {
          text: 'OK',
          onPress: async () => {
            await saveToken();
            setModalVisible(false);
            setWorkoutSaved(true);
            setAddFavouritesVisible(false);
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );

  const modalPopup = () => {
    const titleText = text || 'My workout';
    if (titleText.length >= 3 && titleText.length < 20) {
      setWarning('');
      setTitle(titleText);
    }
    setModalVisible(true);
  };

  const onCancel = () => {
    setModalVisible(false);
    setWarning('');
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
      if (updatedWorkoutNames.length >= 10) {
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
      if (updatedFavourites.length >= 10) {
        updatedFavourites.shift();
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

  const checkMinVal = (text: String) => {
    text.length >= 3 ? setWarning('') : setWarning('3');
  };

  const height = useHeaderHeight();

  return (
    <ContainerWrapper>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior="padding"
        style={styles.keyboardAvoidingView}
        enabled>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={height}
            behavior="padding"
            style={styles.keyboardAvoidingView}
            enabled>
            <OuterModalView>
              <InnerModalView>
                <ModalHeader>Workout name</ModalHeader>
                <ModalView>
                  <ModalTextInput
                    onChangeText={text => {
                      onChangeText(text);
                      checkMinVal(text);
                    }}
                    value={text}
                    placeholder="My workout"
                    maxLength={18}
                  />
                  {!warning && <ModalSpace>{warnings[3]}</ModalSpace>}
                  {warning && <Warning>{warnings[warning]}</Warning>}
                </ModalView>
                <CreateWorkoutView>
                  <Button onPress={onConfirm}>
                    <CreateWorkoutText>Create</CreateWorkoutText>
                  </Button>
                  <CreateWorkoutSeparator />
                  <Button onPress={onCancel}>
                    <CancelCreateWorkoutText>Cancel</CancelCreateWorkoutText>
                  </Button>
                </CreateWorkoutView>
              </InnerModalView>
            </OuterModalView>
          </KeyboardAvoidingView>
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
            <ConfirmInnerModalView>
              <ModalHeader>New Workout {`'${title}'`} Saved!</ModalHeader>
              <CompleteIconView>
                <CompleteIcon
                  name="check-circle"
                  size={Dimensions.get('window').height * 0.175}
                  color={'green'}
                />
              </CompleteIconView>
              <Button onPress={closeConfirm}>
                <ButtonText>Ok</ButtonText>
              </Button>
            </ConfirmInnerModalView>
          </OuterModalView>
        </Modal>
        <Header>{title}</Header>
        <FlatList
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
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
          {addFavouritesVisible && (
            <Button onPress={modalPopup}>
              <ButtonText>Add to favourites</ButtonText>
            </Button>
          )}
          <Button
            onPress={() => {
              clearWorkout({navigation});
            }}>
            <ButtonText>Complete Workout</ButtonText>
          </Button>
        </ButtonWrapper>
      </KeyboardAvoidingView>
    </ContainerWrapper>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 200,
  },
});
