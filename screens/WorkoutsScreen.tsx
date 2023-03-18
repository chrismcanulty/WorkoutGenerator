import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function WorkoutsScreen({navigation}: NativeStackHeaderProps) {
  return (
    <View>
      <Text style={styles.header}>I am workouts screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Montserrat-Regular',
  },
});
