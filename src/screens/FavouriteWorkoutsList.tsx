import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext} from 'react';
import {
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import {BorderBottom} from '../../types/data';
import DeleteIcon from 'react-native-vector-icons/FontAwesome5';

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
const ContainerWrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
`;
const FavouriteButton = styled.TouchableOpacity`
  font-size: 24px;
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
const TitleView = styled.View<BorderBottom>`
  border-color: rgb(230, 230, 230);
  border-top-width: 1px;
  border-bottom-width: ${props => props.borderBottom}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TitleText = styled.Text`
  color: rgb(38, 38, 38);
  font-family: 'Montserrat-Regular';
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 30px;
`;

export default function FavouriteWorkoutsList({
  navigation,
}: {
  navigation: NativeStackHeaderProps;
  children?: JSX.Element | JSX.Element[];
}) {
  const {
    getFavouriteTokens,
    favouriteTokens,
    getWorkoutNames,
    workoutNames,
    loadingFavourites,
  } = useContext(UserContext);

  // use saveToken function for reference
  // determine which favourite is being referenced based on name and token number
  // create new variable with spread operator as a copy of currently existing token and name
  // delete in place the referenced token and names from respective data structures
  // set the updated data to each respective state
  // set data stored in states to Async storage
  // once functionality is confirmed, create an 'are you sure' iOS popup similar to creating new favourite

  const onDelete = () => {
    console.log('delete');
  };

  // const saveToken = async () => {
  //   const randomToken = () => {
  //     return Date.now() + Math.random();
  //   };

  //   const newFavouriteToken = randomToken();
  //   setTitle(text);

  //   try {
  //     let values = await getWorkoutNames();
  //     let updatedWorkoutNames = [...values];
  //     if (updatedWorkoutNames.length >= 10) {
  //       updatedWorkoutNames.shift();
  //     }

  //     updatedWorkoutNames.push({token: newFavouriteToken, title: text});
  //     const jsonValue = JSON.stringify(updatedWorkoutNames);
  //     await AsyncStorage.setItem('@workout-names', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }

  //   try {
  //     // first get favourite tokens stored in async storage, if any
  //     let values = await getFavouriteTokens();
  //     let updatedFavourites = [...values];
  //     // remove oldest workout token from array if there are too many favourite workouts
  //     if (updatedFavourites.length >= 10) {
  //       updatedFavourites.shift();
  //     }
  //     // add new favourite workout token to the list
  //     updatedFavourites.push(newFavouriteToken);
  //     const jsonValue = JSON.stringify(updatedFavourites);
  //     await AsyncStorage.setItem('@favourite-token', jsonValue);
  //     try {
  //       const exerciseJson = JSON.stringify(exerciseData);
  //       await AsyncStorage.setItem(
  //         `@exercise_key-${newFavouriteToken}`,
  //         exerciseJson,
  //       );

  //       try {
  //         const workoutJson = JSON.stringify(workout);

  //         await AsyncStorage.setItem(
  //           `@workout_key-${newFavouriteToken}`,
  //           workoutJson,
  //         );
  //       } catch (e) {
  //         // saving error
  //       }
  //     } catch (e) {
  //       // saving error
  //     }
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  useEffect(() => {
    getFavouriteTokens();
    getWorkoutNames();
  }, []);

  if (loadingFavourites) {
    return (
      <ContainerWrapper>
        <Header>Loading...</Header>
        <LoadingView>
          <ActivityIndicator size="large" />
        </LoadingView>
      </ContainerWrapper>
    );
  }

  if (
    !favouriteTokens ||
    favouriteTokens.length === 0 ||
    !workoutNames ||
    workoutNames.length === 0
  ) {
    // create dummy component based on below informing user there are no favourites yet
    return (
      <ContainerWrapper>
        <Header>No favourites yet, please add some!</Header>
        <ButtonWrapper>
          <Button onPress={() => navigation.push('Root')}>
            <ButtonText>Home</ButtonText>
          </Button>
        </ButtonWrapper>
      </ContainerWrapper>
    );
  }

  return (
    <ContainerWrapper>
      <Header>Favourite Workouts</Header>
      <FlatList
        keyExtractor={item => item}
        contentContainerStyle={{paddingBottom: 200}}
        data={favouriteTokens}
        renderItem={({index, item}) => (
          <FavouriteButton
            onPress={() =>
              navigation.push('SavedWorkouts', {
                token: favouriteTokens[index],
                title: workoutNames.find((x: any) => x.token === item)?.title,
              })
            }>
            <TitleView
              borderBottom={index === favouriteTokens.length - 1 ? 1 : 0}>
              <TitleText>
                {workoutNames.find((x: any) => x.token === item)?.title}
              </TitleText>
              <TouchableOpacity onPress={onDelete} style={{}}>
                <DeleteIcon
                  name="trash"
                  size={20}
                  color={'rgb(169,169,169)'}
                  style={styles.delete}
                />
              </TouchableOpacity>
            </TitleView>
          </FavouriteButton>
        )}
      />
      <ButtonWrapper>
        <Button onPress={() => navigation.push('Root')}>
          <ButtonText>Home</ButtonText>
        </Button>
      </ButtonWrapper>
    </ContainerWrapper>
  );
}

const styles = StyleSheet.create({
  delete: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 25,
  },
});
