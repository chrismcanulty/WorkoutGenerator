import * as React from 'react';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import {TailwindProvider} from 'tailwindcss-react-native';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  // const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <TailwindProvider>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
