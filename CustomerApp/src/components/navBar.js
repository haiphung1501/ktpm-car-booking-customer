import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image  } from 'react-native';

import HomeIc from "../assets/images/home.png";
import BookingIc from "../assets/images/booking.png";
import ProfileIc from "../assets/images/profile.png";

const NavigationBar = ({ activeTab, onChangeTab }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tabItem,
          activeTab === 'home' && styles.activeTabItem,
        ]}
        onPress={() => onChangeTab('home')}
      >
        <Image
          source={HomeIc}
          style={[{height: 24, width: 24}, activeTab === 'home' && styles.activeTabImage]}
        />
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabItem,
          activeTab === 'history' && styles.activeTabItem,
        ]}
        onPress={() => onChangeTab('history')}
      >
        <Image
          source={BookingIc}
          style={[{height: 24, width: 24}, activeTab === 'history' && styles.activeTabImage]}
        />
        <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tabItem,
          activeTab === 'profile' && styles.activeTabItem,
        ]}
        onPress={() => onChangeTab('profile')}
      >
        <Image
          source={ProfileIc}
          style={[{height: 24, width: 24}, activeTab === 'profile' && styles.activeTabImage]}
        />
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },

  activeTabText: {
    color: '#00880d',
  },
  activeTabImage: {
    tintColor: '#00880d',
  },
});

export default NavigationBar;
