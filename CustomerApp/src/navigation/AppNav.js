import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from '../context/AuthContext';
import AuthStack from './AuthStack';
import HomeBottomTab from './HomeBottomTab';

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
      {userToken !== null ? <HomeBottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
