import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import RegistrationSVG from '../assets/images/misc/registration.svg';
import InputField from '../components/InputField.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

import {AuthContext} from '../context/AuthContext';

const OtpScreen = ({navigation, route}) => {
  const {email} = route.params;
  const [otp, setOtp] = useState(null);

  const {verify} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          OTP
        </Text>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Enter OTP is sent to your email
        </Text>

        <InputField
          label={'Otp'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          // inputType="password"
          value={otp}
          onChangeText={text => setOtp(text)}
        />

        <CustomButton
          label={'Verify OTP'}
          onPress={() => {
            verify(email, otp, navigation);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;
