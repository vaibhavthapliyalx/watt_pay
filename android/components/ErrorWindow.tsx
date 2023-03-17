//--------------- Copyright (c) 2023 WattPay. ---------------//

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, TouchableHighlight} from 'react-native';

interface ErrorWindowProps {
  message: string;
  onDismiss: () => void;
  isDisplayed: boolean;
}

const ErrorWindow = ({message, isDisplayed, onDismiss}: ErrorWindowProps) => {
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={isDisplayed}
    onRequestClose={onDismiss}
    >
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.message}>{message}</Text>
        <TouchableHighlight onPress={onDismiss}>
          <Text style={styles.button}>Dismiss</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    fontSize: 18,
    color: '#007aff',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default ErrorWindow;
