import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

type Props = {
  children: React.ReactNode;
};

export const KeyboardShift = ({children}: Props) => {
  const height = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height + 100}
      behavior="padding"
      style={{flex: 1}}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    margin: 20,
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
});
