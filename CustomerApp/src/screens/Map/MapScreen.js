import React, { useState, useEffect, useRef }  from 'react';

import { View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as geolib from 'geolib';
import { SafeAreaView } from 'react-native-safe-area-context';
import {BASE_URL, GOOGLE_MAPS_APIKEY} from '../../config';
import { Button, Text, TextInput } from 'react-native-paper';

 MapScreen = ({route, navigation}) => {
  const {origin, destination} = route.params;

  const DELTA_FACTOR = 0.00001;

  const Delta = (origin, destination) => {
    const distance = geolib.getDistance(
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude }
    );
    return distance * DELTA_FACTOR;
  };
  const YourLocationView = () =>{
    return (<Image style={{width: 50, height: 50}} source={require('../../assets/images/yourLocationIc.png')}/>)
  };

  const DestinationView = () =>{
    return (<Image style={{width: 50, height: 50}} source={require('../../assets/images/destinationIc.png')}/>)
  };

  const bookingCar = () =>{
    const dataInput = {
    pickupLocation : {
        lat: origin.latitude,
        lng: origin.longitude
    },
    destination: {
        lat: destination.latitude,
        lng: destination.latitude
    },};
    console.log(dataInput);
     axios
      .post(`${BASE_URL}/booking/create`, dataInput)
      .then(res => {
        let bookingInfo = res.data.booking;
        console.log(bookingInfo);
      })
      .catch(e => {
        console.log(`Booking error ${e}`);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style = {styles.container}>
      <View style={{zIndex: 1, display: 'flex', justifyContent: 'space-between', height: '100%'}}>
        <View className='flex items-center align-middle justify-center mt-1'>
          <TouchableOpacity 
            onPress={() => 
              navigation.navigate('Location')} 
            className = 'w-3/4 mb-2 bg-slate-100 p-1'>
            <Text className = 'text-base'>{origin.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => 
              navigation.navigate('Location')} 
            className = 'w-3/4 mb-2 bg-slate-100 p-1'>
            <Text className = 'text-base'>{destination.name}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className='flex items-center align-middle justify-center'>
          <Button
            className = 'mt-6 mb-1 p-2 rounded-lg bg-green-600 w-3/5 h-16'
            onPress={() => {
                bookingCar();
            }}
          ><Text className = 'text-white font-bold text-lg'>Booking Car</Text></Button>
        </TouchableOpacity>

      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: (origin.latitude + destination.latitude)/2,
          longitude: (origin.longitude + destination.longitude)/2,
          latitudeDelta: Delta(origin, destination),
          longitudeDelta: Delta(origin, destination)
        }}
        >

        <Marker coordinate={origin}><YourLocationView/></Marker>
        <Marker coordinate={destination}><DestinationView/></Marker>
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#0F5AF2"
          />
      </MapView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  } 
});

export default MapScreen