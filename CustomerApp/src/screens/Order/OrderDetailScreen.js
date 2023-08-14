import {ScrollView, Text, StyleSheet, TouchableOpacity, View, Image, Animated, PanResponder, Platform, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, {useRef,useEffect, useState} from 'react';

const OrderDetailScreen = ({route, navigation}) => {

  const YourLocationView = () =>{
    return (<Image style={{width: 50, height: 50}} source={require('../../assets/images/destinationIc.png')}/>)
  };

  return (
    <ScrollView className="px-4 pt-4 w-full">
      <View className="bg-white rounded-lg p-3">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Tổng tiền</Text>
          <View>
            <Text className="text-green-700 text-right font-bold text-xl">
              25000đ
            </Text>
            <Text className="text-gray-400 text-right font-medium">
              Thanh toán bằng tiền mặt
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Giá</Text>
          <Text className="text-base font-bold">30000đ</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Giảm giá</Text>
          <Text className="text-base font-bold">-5000đ</Text>
        </View>
      </View>
      <View className="bg-white rounded-lg p-3 mt-4">
        <View className="flex flex-row gap-3 items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-gray-100">
            <Image style={{width: 40, height: 40}} source={require('../../assets/images/desSearchIc.png')} />
          </View>
          <View className='flex flex-col'>
            <Text className='font-bold text-black text-base'>Nguyễn Văn A</Text>
            <Text>Air Blade : 51H-33440</Text>
          </View>
        </View>
        <View className="h-[150px] bg-gray-200 w-full flex flex-row items-center justify-center">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{ 
              latitude: 10.762962070564244,
              longitude: 106.68242875118828,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}>
              <Marker coordinate={{latitude: 10.762962070564244, longitude: 106.68242875118828}} draggable><YourLocationView/></Marker>
            </MapView>
        </View>
        <View className="flex flex-row items-center justify-between mt-3">
          <Text className="font-bold">Xe máy</Text>
          <Text className="font-medium text-gray-500">5km - 20 phút</Text>
        </View>
        <View className="relative">
          <View className="mt-2 border-l-2 absolute top-11 h-10 w-1 border-gray-200 left-2.5" />
          <View className="flex flex-row gap-3 items-start mt-2">
            <MaterialIcons name="gps-fixed" size={24} color="#2F9E44" />
            <View>
              <Text className="font-bold text-black">Điểm đón</Text>
              <Text className="text-gray-500">227 Nguyễn Văn Cừ</Text>
            </View>
          </View>
          <View className="flex flex-row gap-3 items-start mt-6">
            <MaterialIcons name="location-on" size={24} color="#E03131" />
            <View>
              <Text className="font-bold text-black">Điểm đến</Text>
              <Text className="text-gray-500">29 Nguyễn Huy Lượng</Text>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        onPress={() => navigation.navigate('Review')}
        wrapperClass="mt-4 py-3 mb-6 rounded-lg bg-green-600 flex flex-row items-center justify-center"
        textClass="text-white font-bold text-lg"
        label="Đánh giá"
      />
    </ScrollView>
  );

};



const styles = StyleSheet.create({
  progressBG: {
    width: '90%',
    marginTop: 40,
    marginBottom: 50,
    height: 15,
    borderRadius: 10,
    alignSelf: 'center'
  },
 
  progress: {
    width: '50%',
    height: 15,
    backgroundColor: '#4ADE80',
    borderRadius: 10,
  },
  state: {
    marginTop: -27, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  } 
});
export default OrderDetailScreen;
