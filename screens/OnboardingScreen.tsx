import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';

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
      // onDone={() => clearOnboarding}
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
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
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
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
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
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
}
