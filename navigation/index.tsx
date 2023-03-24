import React, {useState, useEffect} from 'react';
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

// {
//   isLoggedIn ? (
//     // Screens for logged in users
//     <Stack.Group>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Profile" component={Profile} />
//     </Stack.Group>
//   ) : (
//     // Auth screens
//     <Stack.Group screenOptions={{headerShown: false}}>
//       <Stack.Screen name="SignIn" component={SignIn} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//     </Stack.Group>
//   );
// }

function RootNavigator() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  return (
    <Stack.Navigator>
      {isOnboarding ? (
        <Stack.Group>
          <Stack.Screen
            name="Workouts"
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
