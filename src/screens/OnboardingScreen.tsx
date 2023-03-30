import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, View} from 'react-native';
import React, {useContext} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {UserContext} from '../context/User.Context';

export default function OnboardingScreen() {
  const {setShouldShowOnboarding} = useContext(UserContext);

  const DotComponent = ({selected}) => {
    return (
      <View
        className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full p-2`}>
        <View
          className={`w-2 h-2 ${
            selected ? 'bg-black' : 'bg-[#DCDCDC]'
          } rounded-full`}></View>
      </View>
    );
  };

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
      onDone={clearOnboarding}
      onSkip={clearOnboarding}
      DotComponent={DotComponent}
      bottomBarColor="#fff"
      bottomBarHighlight={false}
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
