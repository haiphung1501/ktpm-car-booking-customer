import React, {useEffect, useRef, useState} from 'react';

import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import * as geolib from 'geolib';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Button, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL, GOOGLE_MAPS_APIKEY} from '../../config';

import {useBookingStore} from '../../store/bookingStore';
import { classNames } from '../../utils/classNames';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.2;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

MapScreen = ({navigation}) => {
  const origin = useBookingStore.use.origin();
  const destination = useBookingStore.use.destination();

  const originCoords = `${origin.latitude},${origin.longitude}`;
  const destinationCoords = `${destination.latitude},${destination.longitude}`;
  const [travelTime, setTravelTime] = useState('');
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [selectedVehicle, setSelectedVehicle] = useState('goCar');
  const lastGestureDy = useRef(0);

  const waitingDriver = useBookingStore.use.waitingDriver();
  const booking = useBookingStore.use.booking();
  const socket = useBookingStore.use.socket();
  const setSocket = useBookingStore.use.setSocket();
  const setBooking = useBookingStore.use.setBooking();
  const setLocation = useBookingStore.use.setLocation();
  const setCancelBooking = useBookingStore.use.cancelBooking();

  const DELTA_FACTOR = 0.00001;

  useEffect(() => {
    if(booking && booking.bookingStatus === 'completed'){
      setBooking(null);
      setLocation({origin: null, destination: null});
      navigation.navigate('Home');
    }

    const fetchTravelTime = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originCoords}&destinations=${destinationCoords}&key=${GOOGLE_MAPS_APIKEY}`,
        );
        const durationText = response.data.rows[0].elements[0].duration.text;
        let res = parseInt(durationText);
        setTravelTime(res);
      } catch (error) {
        console.error('Error fetching travel time:', error);
      }
    };

    const fetchDistance = () => {
      let temp = Delta(origin, destination);
      setDistance(temp);
    };

    const fetchPrice = () => {
      if(price === 0) {
        let temp = (Delta(origin, destination) / 1000).toFixed(1) * 20000;
        console.log(Delta(origin, destination) / 1000);
        console.log("Price1: ", temp);

        if(origin.address.includes("Quận 5") || origin.address.includes("Quận 1,") || origin.address.includes("Quận 3") || destination.address.includes("Quận 5") || destination.address.includes("Quận 1,") || destination.address.includes("Quận 3")){
          temp = Math.floor((temp + temp * 0.1) / 1000) * 1000; 
          console.log('Price2: ', temp);
          console.log("Origin: ", origin.address);
          console.log("Destination: ", destination.address);
        }
        
        console.log('Price3: ', temp);
        setPrice(temp);
      }
    };

    fetchTravelTime();
    fetchDistance();
    fetchPrice();
 
    if (!socket) {
      setSocket();
    }
  }, [booking]);

  const Delta = (origin, destination) => {
    if(booking){
      let distance = geolib.getDistance(
        {latitude: booking.driverLocation.lat, longitude: booking.driverLocation.lng},
        {latitude: destination.latitude, longitude: destination.longitude},
      );
      return distance;
    }
    else{
      let distance = geolib.getDistance(
        {latitude: origin.latitude, longitude: origin.longitude},
        {latitude: destination.latitude, longitude: destination.longitude},
      );
      return distance;
    }
  };

  const YourLocationViewIc = () => {
    return (
      <Image
        style={{width: 25, height: 25, marginLeft: -12}}
        source={require('../../assets/images/yourLocationIc.png')}
      />
    );
  };

  const DestinationViewIc = () => {
    return (
      <Image
        style={{width: 25, height: 25, marginLeft: -12}}
        source={require('../../assets/images/destinationIc.png')}
      />
    );
  };

  const YourLocationView = () => {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/images/yourLocationIc.png')}
      />
    );
  };

  const CarIcon = () => {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/images/carIc.png')}
      />
    );
  };

  const DestinationView = () => {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={require('../../assets/images/destinationIc.png')}
      />
    );
  };

  const bookingCar = () => {
    const dataInput = {
      pickupAddress: {
        name: origin.name,
        fullAddress: origin.address,
      },
      destinationAddress: {
        name: destination.name,
        fullAddress: destination.address,
      },
      distance: Delta(origin, destination),
      price: price,
      duration: travelTime * 60,
      pickupLocation: {
        lat: origin.latitude,
        lng: origin.longitude,
      },
      destination: {
        lat: destination.latitude,
        lng: destination.longitude,
      },
    };
    console.log(dataInput);
    axios
      .post(`${BASE_URL}/booking/create`, dataInput)
      .then(res => {
        let bookingInfo = res.data.booking;
        console.log('bookingInfo', bookingInfo);
        waitingDriver(bookingInfo._id);
      })
      .catch(e => {
        console.log(`Booking error ${e}`);
      });
  };

  const cancelBooking = bookingId => {
    axios
      .put(`${BASE_URL}/booking/cancel/${bookingId}`)
      .then(res => {
        let bookingInfo = res.data.booking;
        console.log(bookingInfo);
        setCancelBooking(bookingId);
        navigation.navigate('Home');
      })
      .catch(e => {
        console.log(`Booking error ${e}`);
      });
  };

  const toggleBottomSheet = () => {
    bookingCar();
    setTimeout(() => {
      setBottomSheetVisible(!isBottomSheetVisible);
      Animated.spring(animatedValue, {
        toValue: isBottomSheetVisible ? 0 : 1,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  const buttonOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = direction => {
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View className="flex-1 bg-green-100" style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: booking ? (booking.bookingStatus === 'progress' ? (booking.driverLocation.lat + destination.latitude) / 2 : (booking.driverLocation.lat + origin.latitude) / 2) : (origin.latitude + destination.latitude) / 2,
          longitude: booking ? (booking.bookingStatus === 'progress' ? (booking.driverLocation.lng + destination.longitude) / 2 : (booking.driverLocation.lng + origin.longitude) / 2) : (origin.longitude + destination.longitude) / 2,
          latitudeDelta: booking ? (booking.bookingStatus === 'progress' ? Delta(booking.driverLocation, destination) * DELTA_FACTOR: Delta(booking.driverLocation, origin) * DELTA_FACTOR) : Delta(origin, destination) * DELTA_FACTOR,
          longitudeDelta: booking ? (booking.bookingStatus === 'progress' ? Delta(booking.driverLocation, destination) * DELTA_FACTOR: Delta(booking.driverLocation, origin) * DELTA_FACTOR) : Delta(origin, destination) * DELTA_FACTOR,
        }}> 
        <Marker coordinate={booking ? {latitude: booking.driverLocation.lat,
          longitude: booking.driverLocation.lng}: origin} draggable>
          {booking ? <CarIcon/> : <YourLocationView />}
        </Marker>
        <Marker coordinate={booking ? (booking.bookingStatus === 'progress' ? destination : origin) : destination} draggable>
          {booking ? (booking.bookingStatus === 'progress' ? <DestinationView />: <YourLocationView />) : <DestinationView />}
        </Marker>
        <MapViewDirections
          origin={booking ? {
          latitude: booking.driverLocation.lat,
          longitude: booking.driverLocation.lng,
        } : origin}
          destination={booking ?  (booking.bookingStatus === 'progress' ? destination : origin) : destination }
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#0F5AF2"
        />
      </MapView>

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <View className="flex items-center align-middle justify-center mt-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('Location')}
            className="flex flex-row w-3/4 mb-2 bg-slate-100 p-2 h-10 rounded-md shadow-xl shadow-gray-600">
            <YourLocationViewIc />
            <Text className="text-base">{origin.address.substring(0, 35)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Location')}
            className="flex flex-row w-3/4 mb-2 bg-slate-100 p-2 h-10 rounded-md shadow-xl shadow-gray-600">
            <DestinationViewIc />
            <Text className="text-base">
              {destination.address.substring(0, 35)}
            </Text>
          </TouchableOpacity>
        </View>

        {!isBottomSheetVisible && (
          <Animated.View style={[styles.button, {opacity: buttonOpacity}]}>
            <View className="bg-white border border-slate-400 rounded-t-xl pt-4 w-full">
              <TouchableOpacity
                onPress={() => setSelectedVehicle('goBike')}
                style={{
                  backgroundColor:
                    selectedVehicle === 'goBike' ? '#BBF7D0' : 'white',
                  width: '100%',
                  padding: 5,
                }}>
                <View className="flex flex-row justify-between items-center mb-2">
                  <View className="flex flex-row items-center">
                    <Image
                      style={{width: 40, height: 40}}
                      source={require('../../assets/images/motoImage.png')}
                    />
                    <View className="ml-6">
                      <Text className="font-bold text-black text-base">
                        GoBike
                        {origin.address.includes("Quận 5") || origin.address.includes("Quận 1,") || origin.address.includes("Quận 3") || destination.address.includes("Quận 5") || destination.address.includes("Quận 1,") || destination.address.includes("Quận 3") ? <Image 
                        style={{width: 20, height: 20}}
                        source={require('../../assets/images/funds.png')} />: null}
                      </Text>
                      <View className="flex flex-row ">
                        <Text className="text-gray-500">3 phút - </Text>
                        <MaterialIcons name="person" size={18} color="gray" />
                        <Text className="text-gray-500"> 1 chỗ</Text>
                      </View>
                    </View>
                  </View>
                  <Text className="font-bold text-black text-base">
                    15,000 VND
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedVehicle('goCar')}
                style={{
                  backgroundColor:
                    selectedVehicle === 'goCar' ? '#BBF7D0' : 'white',
                  width: '100%',
                  padding: 5,
                }}>
                <View className="flex flex-row justify-between items-center mb-2">
                  <View className="flex flex-row items-center">
                    <Image
                      style={{width: 40, height: 40}}
                      source={require('../../assets/images/carImage.png')}
                    />
                    <View className="ml-6">
                      <Text className="font-bold text-black text-base">
                        GoCar 

                        {origin.address.includes("Quận 5") || origin.address.includes("Quận 1,") || origin.address.includes("Quận 3") || destination.address.includes("Quận 5") || destination.address.includes("Quận 1,") || destination.address.includes("Quận 3") ? <Image 
                        style={{width: 20, height: 20}}
                        source={require('../../assets/images/funds.png')} />: null}
                      </Text>
                      <View className="flex flex-row ">
                        <Text className="text-gray-500">{travelTime} phút - </Text>
                        <MaterialIcons name="person" size={18} color="gray" />
                        <Text className="text-gray-500"> 4 chỗ</Text>
                      </View>
                    </View>
                  </View>
                  <Text className="font-bold text-black text-base">
                    {price.toLocaleString('en-US')} VND
                  </Text>
                </View>
              </TouchableOpacity>
              <View className="flex items-center align-middle justify-center">
                <Button
                  className="mt-5 mb-1 p-1 rounded-lg bg-green-600 w-3/5 h-12"
                  onPress={toggleBottomSheet}>
                  <Text className="text-white font-bold text-base">Đặt xe</Text>
                </Button>
              </View>
            </View>
          </Animated.View>
        )}
      </View>

      {isBottomSheetVisible && booking && (
        <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
          <View className="mt-3 ml-6 flex flex-row items-center">
            <View className="bg-white h-6 w-6 rounded-full items-center justify-center">
              <MaterialIcons name="done" size={20} color="#16A34A" />
            </View>
            
              {booking.bookingStatus === 'accepted' ?<Text className="font-bold text-sm text-white ml-2">
              Tài xế đang đến đón           
              </Text> : <Text className="font-bold text-sm text-white ml-2">
              Bạn sẽ đến nơi trong{' '}            
              </Text>}

              {booking.bookingStatus === 'progress' ? <View className="bg-green-500 rounded-xl ml-2 p-1">
              <Text className="font-bold text-sm text-white ">
                {' '}
                {travelTime} phút{' '}
              </Text>
            </View>: null}
          </View>
          <View className="bg-white mt-3 h-full">
            <View style={styles.draggableArea} {...panResponder.panHandlers}>
              <View style={styles.dragHandle} />
            </View>
            <View className="flex flex-row-reverse px-5 items-center mb-1 justify-between">
              <View className="w-14 h-14 rounded-full bg-gray-100">
                <Image
                  style={{width: 56, height: 56}}
                  source={{uri: booking.userId.avatar.url}}
                /> 
              </View>
              <View className="flex flex-col">
                <Text className="font-bold text-black text-xl">
                  {booking.driverId.displayName}
                </Text>
                <View className="flex flex-row mt-2">
                  <MaterialIcons name="star" size={24} color="#FF8C00" />
                  <Text className="text-base text-gray-500">
                    {booking.driverId.driverRating.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View className="p-3">
              <View className="bg-white border border-slate-400 rounded-lg p-3">
                <View className="flex flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-bold">Tổng tiền</Text>
                  <Text className="text-green-600 text-right font-bold text-xl">
                    {price.toLocaleString('en-US')}VND
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg font-bold">
                    Phương thức thanh toán:{' '}
                  </Text>
                  <Text className="text-lg text-black">Tiền mặt</Text>
                </View>
              </View>
              <View className="bg-white border border-slate-400 rounded-lg p-3 mt-4">
                <View className="relative">
                  <View className="mt-2 border-l-2 absolute top-6 h-14 w-1 border-gray-200 left-2.5" />
                  <View className="flex flex-row gap-3 items-start">
                    <MaterialIcons name="gps-fixed" size={24} color="#2F9E44" />
                    <View>
                      <Text className="font-bold text-black">Điểm đón</Text>
                      <Text className="text-gray-500">{origin.name}</Text>
                    </View>
                  </View>
                  <Text className="font-medium text-gray-500 ml-9 mt-4">
                    {(distance / 1000).toFixed(1)} km - {travelTime} phút
                  </Text>
                  <View className="flex flex-row gap-3 items-start mt-2">
                    <MaterialIcons
                      name="location-on"
                      size={24}
                      color="#E03131"
                    />
                    <View>
                      <Text className="font-bold text-black">Điểm đến</Text>
                      <Text className="text-gray-500">{destination.name}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="bg-white border border-slate-400 rounded-lg p-3 mt-4 flex flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold">
                    {booking.carId.licensePlate}
                  </Text>
                  <Text className="text-lg text-black">
                    {booking.carId.brand}
                  </Text>
                </View>
                <View className="w-8 h-8 rounded-full bg-green-600 items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', {idBooking: booking._id})
                    }>
                    <MaterialIcons name="chat" size={22} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity className="flex items-center align-middle justify-center" 
              onPress={() => cancelBooking(booking._id)}>
                <Button className="mt-6 mb-1 p-1 rounded-lg bg-slate-400 w-3/5 h-14">
                  <Text className="text-white font-bold text-lg">
                    Hủy chuyến
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: '#16A34A',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  loader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
