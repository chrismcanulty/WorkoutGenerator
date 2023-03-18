import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View>
      <Text style={styles.header}>I am home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Montserrat-Regular',
  },
});
