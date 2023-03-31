import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import EquipmentScreen from '../screens/Equipment';
import RepsScreen from '../screens/RepsScreen';
import {UserContext} from '../context/User.Context';

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
  const {shouldShowOnboarding} = useContext(UserContext);

  return (
    <Stack.Navigator>
      {shouldShowOnboarding ? (
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
            name="Equipment"
            component={EquipmentScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Reps"
            component={RepsScreen}
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
