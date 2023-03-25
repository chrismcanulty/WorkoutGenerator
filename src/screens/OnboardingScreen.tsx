import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';
import {UserContext} from '../context/User.Context';

const Header = styled.Text`
  font-family: 'Montserrat-Regular';
`;

export default function OnboardingScreen() {
  const {setShouldShowOnboarding} = useContext(UserContext);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.setItem('@isOnboarding', 'true');
      setShouldShowOnboarding(false);
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
              source={require('../../assets/images/OnboardingOne.jpg')}
              className="w-72 h-72 object-contain rounded-xl overflow-hidden"
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
              source={require('../../assets/images/OnboardingTwo.png')}
              className="w-72 h-72 object-contain rounded-xl overflow-hidden"
            />
          ),
          title: 'Generate with just a few clicks',
          subtitle:
            'Simply select your desired muscle group, number of exercises and available equipment',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/images/OnboardingThree.jpg')}
              className="w-72 h-72 object-contain rounded-xl overflow-hidden"
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
