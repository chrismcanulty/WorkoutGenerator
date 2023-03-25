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
    <SafeAreaView>
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{
                  uri: 'https://previews.123rf.com/images/irfanfirdaus/irfanfirdaus2003/irfanfirdaus200300016/143492365-vector-illustration-mobile-online-shopping-women-shop-online-with-smartphone-mobile-shopping-concept.jpg',
                }}
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
              />
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
      {/* <View>
        <Header className="text-blue-600 text-3xl">
          I am onboarding screen
        </Header>
        <TouchableOpacity onPress={clearOnboarding}>
          <Text>Clear Onboarding</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
