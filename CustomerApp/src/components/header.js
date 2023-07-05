import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/bgImg.png')}
        style={styles.backgroundImage}
      />
      <TouchableOpacity style={styles.mapButton}>
        <Image
          source={require('../assets/images/map.png')}
          style={styles.mapIcon}
        />
        <Text style={styles.mapButtonText}>Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    opacity: 0.8,
    marginTop: -10,
  },
  mapButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  mapIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  mapButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
