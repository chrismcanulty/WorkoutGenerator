import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {useEffect, useContext} from 'react';
import {
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../context/User.Context';
import {BorderBottom} from '../../types/data';
import DeleteIcon from 'react-native-vector-icons/FontAwesome5';
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
    setFavouriteTokens,
    getWorkoutNames,
    workoutNames,
    setWorkoutNames,
    loadingFavourites,
  } = useContext(UserContext);

  const deleteFavourite = async (index: number, item: any) => {
    try {
      // retrieve all workout names
      let values = await getWorkoutNames();
      let updatedWorkoutNames = [...values];
      // delete workoutName : token key value pair by splicing in place in array, then save to async storage
      updatedWorkoutNames.splice(index, 1);
      const jsonValue = JSON.stringify(updatedWorkoutNames);
      await AsyncStorage.setItem('@workout-names', jsonValue);
      setWorkoutNames(updatedWorkoutNames);
    } catch (e) {
      // saving error
    }
    try {
      let values = await getFavouriteTokens();
      let updatedFavourites = [...values];
      const tokenIndex = updatedFavourites.indexOf(+item);
      // delete token by splicing in place in array, then save to async storage
      updatedFavourites.splice(tokenIndex, 1);
      const jsonValue = JSON.stringify(updatedFavourites);
      await AsyncStorage.setItem('@favourite-token', jsonValue);
      try {
        await AsyncStorage.removeItem(`@exercise_key-${item}`);
        await AsyncStorage.removeItem(`@workout_key-${item}`);
        setFavouriteTokens(updatedFavourites);
      } catch (e) {
        // saving error
      }
    } catch (e) {
      // saving error
    }
  };

  const onConfirm = (index: number, item: any) => {
    Alert.alert('Delete Favourite', 'Ok to delete this workout?', [
      {
        text: 'OK',
        onPress: async () => {
          await deleteFavourite(index, item);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

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
              <TouchableOpacity
                onPress={() => {
                  onConfirm(index, item);
                }}
                style={{}}>
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
