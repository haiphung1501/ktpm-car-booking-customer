import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import AuthStack from './AuthStack';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <HomeScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
