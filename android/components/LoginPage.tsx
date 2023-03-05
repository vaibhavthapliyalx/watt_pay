//--------------- Copyright (c) 2023 WattPay. ---------------//

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LoginProps {
  navigation: any;
}

const appLogoPath = '../assets/Images/app-name-with-value-proposition-logo.png';


const LoginPage: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
    } else {
      setErrorMessage(`Dear ${email}.  We will add support for authentication soon.`);
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require(appLogoPath)} style={styles.logo}/>
      <Text style={styles.title}>Please login below</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#62CC90'
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#62CC90',
    padding: 8,
    marginVertical: 8,
    width: '80%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#62CC90',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 16,
  },
  linkText: {
    color: '#62CC90',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 400,
    height: 100
  }
});

export default LoginPage;
