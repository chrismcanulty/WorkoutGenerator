import * as React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  // const isLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <>
      <Navigation colorScheme={colorScheme} />
      <StatusBar style="auto" />
    </>
  );
}
