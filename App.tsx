//--------------- Copyright (c) 2023 WattPay. ---------------//

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import GenerateInvoiceScreen from './android/components/GenerateInvoiceScreen';
import LoginPage from './android/components/LoginPage';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GenerateInvoiceScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18272E',
  },
});

export default App;
