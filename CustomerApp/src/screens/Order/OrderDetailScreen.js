import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import {useHistoryStore} from '../../store/historyStore';
import {GOOGLE_MAPS_APIKEY} from '../../config';
import MapViewDirections from 'react-native-maps-directions';

const carType = {
  car: 'Xe hơi',
  motorbike: 'Xe máy',
  bus: 'Xe bus',
};

const OrderDetailScreen = ({route, navigation}) => {
  const orderId = route.params.orderId;
  const order = useHistoryStore.use.getBooking()(orderId);
  console.log({order});

  const YourLocationView = () => {
    return (
      <Image
        style={{width: 50, height: 50}}
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

  return (
    <ScrollView className="px-4 pt-4 w-full">
      <View className="bg-white rounded-lg p-3">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Tổng tiền</Text>
          <View>
            <Text className="text-green-700 text-right font-bold text-xl">
              {order.price + (order.tipping || 0)}
            </Text>
            <Text className="text-gray-400 text-right font-medium">
              Thanh toán bằng tiền mặt
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Giá</Text>
          <Text className="text-base font-bold">{order.price}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Tips</Text>
          <Text className="text-base font-bold">{order.tipping || 0}</Text>
        </View>
      </View>
      <View className="bg-white rounded-lg p-3 mt-4">
        <View className="flex flex-row gap-3 items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-gray-100">
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/images/desSearchIc.png')}
            />
          </View>
          <View className="flex flex-col">
            <Text className="font-bold text-black text-base">
              {order.driverId.displayName}
            </Text>
            <Text>Air Blade : 51H-33440</Text>
          </View>
        </View>
        <View className="h-[150px] bg-gray-200 w-full flex flex-row items-center justify-center">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: order.destination.lat,
              longitude: order.destination.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: order.pickupLocation.lat,
                longitude: order.pickupLocation.lng,
              }}
              draggable>
              <YourLocationView />
            </Marker>
            <Marker
              coordinate={{
                latitude: order.destination.lat,
                longitude: order.destination.lng,
              }}
              draggable>
              <DestinationViewIc />
            </Marker>
            <MapViewDirections
              origin={{
                latitude: order.pickupLocation.lat,
                longitude: order.pickupLocation.lng,
              }}
              destination={{
                latitude: order.destination.lat,
                longitude: order.destination.lng,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#0F5AF2"
            />
          </MapView>
        </View>
        <View className="flex flex-row items-center justify-between mt-3">
          <Text className="font-bold">{carType[order.carType]}</Text>
          <Text className="font-medium text-gray-500">
            {order.distance / 1000}km - {order.duration / 60} phút
          </Text>
        </View>
        <View className="relative">
          <View className="mt-2 border-l-2 absolute top-11 h-10 w-1 border-gray-200 left-2.5" />
          <View className="flex flex-row gap-3 items-start mt-2">
            <MaterialIcons name="gps-fixed" size={24} color="#2F9E44" />
            <View>
              <Text className="font-bold text-black">Điểm đón</Text>
              <Text className="text-gray-500">
                {order.pickupAddress.fullAddress}
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-3 items-start mt-6">
            <MaterialIcons name="location-on" size={24} color="#E03131" />
            <View>
              <Text className="font-bold text-black">Điểm đến</Text>
              <Text className="text-gray-500">
                {order.destinationAddress.fullAddress}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        disabled={order.isReviewed}
        onPress={() => navigation.navigate('Review', {orderId})}
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
    alignSelf: 'center',
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
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default OrderDetailScreen;
