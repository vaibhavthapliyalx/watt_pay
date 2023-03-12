//--------------- Copyright (c) 2023 WattPay. ---------------//

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  activeTab: string;
  onChangeTab: (tabName: string) => void;
}

const NavBar: React.FC<IProps> = ({ activeTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'Home' && styles.activeTabButton,
        ]}
        onPress={() => onChangeTab('Home')}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 'Home' && styles.activeTabButtonText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'Settings' && styles.activeTabButton,
        ]}
        onPress={() => onChangeTab('Settings')}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 'Settings' && styles.activeTabButtonText,
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'About' && styles.activeTabButton,
        ]}
        onPress={() => onChangeTab('About')}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 'About' && styles.activeTabButtonText,
          ]}
        >
          About
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabButton: {
    backgroundColor: '#007aff',
  },
  activeTabButtonText: {
    color: '#fff',
  },
});

export default NavBar;
