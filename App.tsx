//--------------- Copyright (c) 2023 WattPay. ---------------//

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LoginPage from './android/components/LoginPage';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginPage navigation={undefined}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
