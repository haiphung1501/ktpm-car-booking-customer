import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState, useEffect} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const register = async (username, password, navigation) => {
    const dataInput = {email: username, password: password};

    await axios
      .post(`${BASE_URL}/user/register`, dataInput)
      .then(res => {
        let userInfo = res.data.user;

        console.log(userInfo.email);
        navigation.navigate('Otp', {email: username});
      })
      .catch(e => {
        console.log(`Register error ${e}`);
      })
      .finally(() => {});
  };

  const verify = (username, otp, navigation) => {
    const dataInput = {email: username, otp: otp};

    axios
      .post(`${BASE_URL}/user/verify`, dataInput)
      .then(res => {
        let check = res.data.success;

        if (check === true) {
          navigation.navigate('Login');
        } else {
          console.log('Error');
        }
      })
      .catch(e => {
        console.log(`Verify error ${e}`);
      })
      .finally(() => {});
  };

  const login = (username, password) => {
    setIsLoading(true);
    const dataInput = {email: username, password: password};
    axios
      .post(`${BASE_URL}/user/login`, dataInput)
      .then(res => {
        let userInfo = res.data.user,
          userToken = res.data.token;
        setUserInfo(userInfo);
        setUserToken(userToken);

        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', userToken);

        console.log(userInfo);
        console.log('User Token: ' + userToken);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setUserToken(userToken);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{register, verify, login, logout, isLoading, userToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
