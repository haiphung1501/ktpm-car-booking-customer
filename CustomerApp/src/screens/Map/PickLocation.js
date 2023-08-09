import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  StyleSheet,
} from 'react-native';

import {PLACES_ICON} from '../../utils/address';
import {classNames} from '../../utils/classNames';
import {Recent} from '../../utils/sources';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';

import {GOOGLE_MAPS_APIKEY} from '../../config';

const RecentlyPlaces = [
  {
    name: 'DH KHTN',
    address: '227 Nguyen Van Cu',
  },
  {
    name: 'DH KT',
    address: 'Nguyen Tri Phuong, Q10',
  },
  {
    name: 'Ba Den Mountain',
    address: 'TP Tay Ninh',
  },
];

const PLACES = [
  {
    type: 'home',
    name: 'Home',
    address: 'TP HCM',
  },
  {
    type: 'company',
    name: 'Company',
    address: 'TP HCM',
  },
  {
    type: 'place',
    name: 'Trường',
    address: 'TP HCM',
  },
];

const PickLocation = ({navigation}) => {
  const onFocus = useRef();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [hasFetchedCurrentLocation, setHasFetchedCurrentLocation] =
    useState(false);

  useEffect(() => {
    focusDestination();
    requestAccessPermission();

    if (!hasFetchedCurrentLocation) {
      getCurrentLocation();
      setHasFetchedCurrentLocation(true);
    }
    handleSendLocation();
  }, [origin, destination]);

  const handleSendLocation = () => {
    if (destination !== undefined) {
      navigation.navigate('Map', {origin: origin, destination: destination});
    }
  };

  const requestAccessPermission = () => {
    if (Platform.OS === 'ios') {
      // Request location permission for iOS
      Geolocation.requestAuthorization('whenInUse');
    } else if (Platform.OS === 'android') {
      // Request location permission for Android
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Using the location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
          } else {
            console.log('Location permission denied');
          }
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setOrigin(location);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const focusDestination = () => {
    if (onFocus.current) {
      onFocus.current.focus();
    }
  };

  const YourLocationView = () => {
    return (
      <Image
        style={{width: 30, height: 30}}
        source={require('../../assets/images/destinationIc.png')}
      />
    );
  };

  const DestinationView = () => {
    return (
      <Image
        style={{width: 25, height: 25}}
        source={require('../../assets/images/desSearchIc.png')}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100  ">
      <View style={{width: '100%'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginLeft: 5,
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 5,
            }}>
            <YourLocationView />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Your Location"
            enablePoweredByContainer={false}
            onFail={error => console.log(error)}
            fetchDetails={true}
            onPress={(data, details = null) => {
              let originCordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
                name: details.formatted_address,
              };
              setOrigin(originCordinates);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            styles={ggStyle}
          />
        </View>

        <View
          style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginLeft: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 7,
              marginLeft: -2,
            }}>
            <DestinationView />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            placeholder="Destination"
            ref={onFocus}
            enablePoweredByContainer={false}
            onFail={error => console.log(error)}
            fetchDetails={true}
            onPress={(data, details = null) => {
              let destinationCordinates = {
                latitude: details?.geometry?.location.lat,
                longitude: details?.geometry?.location.lng,
                name: details.formatted_address,
              };
              setDestination(destinationCordinates);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            styles={ggStyle}
          />
        </View>

        {/* Recently */}
        <View className="ml-8 mt-2">
          <Text className="font-bold w-auto text-lg mb-2">
            Recently Visited Locations:
          </Text>
          <ScrollView>
            {RecentlyPlaces.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={classNames(
                  'w-80 border-b border-gray-300 mb-2 pb-2',
                  {
                    'border-0': index + 1 === RecentlyPlaces.length,
                  },
                )}>
                <View
                  style={{
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={Recent} className="mx-1 w-[25px] h-[25px]" />
                  <View className="flex flex-col ml-5">
                    <Text className="text-base font-bold">{item.name}</Text>
                    <Text className="text-sm text-gray-400">
                      {item.address}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Favorite */}
        <View className="ml-8 mt-2">
          <Text className="font-bold w-auto text-lg mb-2">
            Favourite Locations:
          </Text>
          <ScrollView>
            {PLACES.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={classNames(
                  'w-80 border-b border-gray-300 mb-2 pb-2',
                  {
                    'border-0': index + 1 === PLACES.length,
                  },
                )}>
                <View
                  style={{
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={PLACES_ICON[item.type]}
                    className="mx-1 w-[25px] h-[25px]"
                  />
                  <Text className="ml-5 text-base font-bold">{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ggStyle = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignSelf: 'flex-start',
    width: '90%',
  },
  listView: {
    position: 'absolute',
    top: 50,
    left: -35,
    alignContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 0,
    zIndex: 1000,
  },
  row: {
    backgroundColor: '#FFF',
  },
});
export default PickLocation;
