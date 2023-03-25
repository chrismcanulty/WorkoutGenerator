import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {ColorSchemeName} from 'react-native';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import PlannerIcon from 'react-native-vector-icons/FontAwesome5';
import MuscleGroup from '../screens/MuscleGroup';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  // set isOnboarding to false once onboarding has been completed
  const [isOnboarding, setIsOnboarding] = useState(true);
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@isOnboarding');
      if (value !== null) {
        setIsOnboarding(false);
      }
    } catch (err) {
      console.log('Error @checkOnboarding: ', err);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <Stack.Navigator>
      {isOnboarding ? (
        <Stack.Group>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{title: '', headerShown: false}}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Workouts"
            component={WorkoutsScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="MuscleGroup"
            component={MuscleGroup}
            options={{title: ''}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <PlannerIcon name="clipboard-list" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
