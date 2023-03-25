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
          title: 'Happy Shopping',
          subtitle: 'You can get such great deals with this app',
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
          title: 'One stop shop',
          subtitle: 'Rediscover your love of shopping',
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
          title: 'The joy of consumption',
          subtitle: 'Fill the void in your heart, forget buyers remorse',
        },
      ]}
    />
  );
}
