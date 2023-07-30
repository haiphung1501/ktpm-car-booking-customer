import React, { useState, useRef, useEffect }  from 'react';

import { View, Image, StyleSheet} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';  // map
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as geolib from 'geolib';
import axios from 'axios';
import { useRoute  } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import {BASE_URL} from '../../config';
// AIzaSyCCqm6B_WNT1UxOjt0InsHocTxT9QjgeAc Hai
const GOOGLE_MAPS_APIKEY = 'AIzaSyCCqm6B_WNT1UxOjt0InsHocTxT9QjgeAc';

 MapScreen = (route) => {
  // const mapRef = useRef(null);
  // const route = useRoute();
  const origin = route.route.params;


  // const DELTA_FACTOR = 0.00001;

  useEffect(() => {
    console.log(origin);
    console.log(destination);
    if(origin !== undefined && destination !== undefined){
      calculateMapZoom();
    }

  }, [origin, destination]);
  
  // async function moveToLocation (latitude, longitude){
  //   mapRef.current.animateToRegion(
  //     {
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.03 ,
  //       longitudeDelta:0.03,
  //     },
  //     2000,
  //   )
  // }

  const calculateMapZoom = () => {
    const distance = calculateDistance(origin, destination);
    const latitudeDelta = distance * DELTA_FACTOR;
    const longitudeDelta = distance * DELTA_FACTOR;
    mapRef.current.animateToRegion({
      latitude: (origin.latitude + destination.latitude) / 2,
      longitude: (origin.longitude + destination.longitude) / 2,
      latitudeDelta,
      longitudeDelta,
    });
  };

  const calculateDistance = (origin, destination) => {
    const distance = geolib.getDistance(
      { latitude: origin.latitude, longitude: origin.longitude },
      { latitude: destination.latitude, longitude: destination.longitude }
    );
    return distance;
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
    <SafeAreaView className="flex-1 bg-green-100">
    <View style = {styles.container}>
      <View style={{zIndex: 1, flex: 1, flexDirection: 'column', marginTop: 10, }}>
        <View style={{flex: 1, width: "75%" , alignSelf: 'center'}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            enablePoweredByContainer={false}
            placeholder='Your location'
            
            onPress={(data, details = null) => {
              navigation.goBack();
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            onFail={error => console.log(error)}
            />
        </View>
        <View style={{flex: 1, marginTop: -330, width: "75%" , alignSelf: 'center'}}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder='Destination'
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              navigation.goBack();
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            onFail={error => console.log(error)}
            />
        </View>
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}>
        {origin !== undefined ? <Marker coordinate={origin}><YourLocationView/></Marker>:null}
        {destination !== undefined ? <Marker coordinate={destination}><DestinationView/></Marker>:null}
        {origin != undefined && destination != undefined ? <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#0F5AF2"
          /> : null}
      </MapView>
      <CustomButton
        label={'Booking Car'}
        onPress={() => {
          if(origin !== undefined && destination !== undefined){
            bookingCar();
          }
        }}
      />
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

export default MapScreen()