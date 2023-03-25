import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
// import {useNavigation} from '@react-navigation/native';

export default function OnboardingScreen({navigation}: NativeStackHeaderProps) {
  const Header = styled.Text`
    font-family: 'Montserrat-Regular';
  `;

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@isOnboarding', 'false');
    } catch (err) {
      console.log('Error @setItem: ', err);
    }
  };

  return (
    <Onboarding
      // best practices? See around 33 min mark https://www.youtube.com/watch?v=z5oHeKseh1w
      // when above link instructions are followed, resulting error refers to this link:
      // https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
      onDone={clearOnboarding}
      onSkip={clearOnboarding}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://previews.123rf.com/images/irfanfirdaus/irfanfirdaus2003/irfanfirdaus200300016/143492365-vector-illustration-mobile-online-shopping-women-shop-online-with-smartphone-mobile-shopping-concept.jpg',
              }}
              className="w-72 h-72 object-contain"
            />
          ),
          title: 'Create new workouts',
          subtitle:
            'Get inspiration for new exercises to add to your existing routine, or create a brand new workout',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://cdn.dribbble.com/users/1458982/screenshots/4291206/sign-in-dribble.png?compress=1&resize=400x300&vertical=top',
              }}
              className="w-72 h-72 object-contain"
            />
          ),
          title: 'Generate with just a few clicks',
          subtitle:
            'Simply select your desired muscle group, number of exercises and available equipment and let us generate an appropriate workout for you',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/woman-shopping-sales-happy-young-holding-paper-bags-enjoying-126694001.jpg',
              }}
              className="w-72 h-72 object-contain"
            />
          ),
          title: 'Save your favourites',
          subtitle:
            'You can save your top three workouts so you can easily refer to them later',
        },
      ]}
    />
  );
}
