import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MapView, { Marker } from 'react-native-maps'; // map

import {Text} from 'react-native-paper';
import {PLACES_ICON} from '../../utils/address';
import {classNames} from '../../utils/classNames';
import {Driver, Recent} from '../../utils/sources';

import Images from '../../utils/sources';
const DESTINATIONS = [
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
  {
    type: 'place',
    name: 'Trường 1',
    address: 'TP HCM',
  },
  {
    type: 'place',
    name: 'Trường 2',
    address: 'TP HCM',
  },
];

const HomeScreen = ({navigation}) => {
  // const [destination, setDestination] = useState(null);

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <ScrollView className="flex-1 bg-green-100 pb-4">
        <View className="h-[200px] bg-transparent">
          <Image
            source={Images.BgImg}
            className="w-full h-[200px] opacity-80 -mt-2.5"
          />
          <TouchableOpacity className="absolute flex flex-row flex-nowrap top-4 right-4 items-center px-4 py-2 bg-green-200 rounded-full" onPress={() => navigation.navigate("Map")}>
            <Image source={Images.Map} className="w-[25px] h-[25px] mr-1" />
            <Text className="text-xl font-bold">Maps</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center bg-white p-4 shadow rounded-2xl mx-4">
          <MaterialIcons name="location-on" color="red" size={30} />
          <TextInput placeholder="Where to?" />
        </View>
        <View className="px-4 py-6 bg-white m-4 rounded-2xl">
          <Text style={styles.title}>Recently</Text>
          {DESTINATIONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={classNames('border-b border-gray-300 mb-2 pb-2', {
                'border-0': index + 1 === DESTINATIONS.length,
              })}>
              <View style={styles.rowContent}>
                <Image source={Recent} className="mx-1 w-[25px] h-[25px]" />
                <View className="flex flex-col ml-5">
                  <Text className="text-base font-bold">{item.name}</Text>
                  <Text className="text-sm text-gray-400">{item.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={styles.title}>Booking timer</Text>
          <TouchableOpacity>
            <View className="mb-4 rounded-lg h-20 justify-start items-center p-3 bg-green-300">
              <Image source={Driver} className="mx-1 w-[30px] h-[30px]" />
              <Text className="text-base font-bold">
                Book a car by the hour
              </Text>
            </View>
          </TouchableOpacity>
          <View className="flex flex-row justify-between items-center">
            <Text style={styles.title}>Favorite Place</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Address')}
              className="w-8 h-8 flex items-center justify-center bg-[#ADD9B2] rounded-full">
              <MaterialIcons name="arrow-forward" size={24} color="#2F9E44" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row gap-4">
              {PLACES.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex flex-col gap-2 items-center">
                  <View className="w-14 h-14 rounded-full flex items-center justify-center bg-[#ADD9B2]">
                    <Image
                      source={PLACES_ICON[item.type]}
                      className="w-6 h-6"
                    />
                  </View>
                  <Text style={styles.label}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => navigation.navigate('AddAddress')}
                className="flex flex-col gap-2 items-center">
                <View className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#ADD9B2]">
                  <MaterialIcons name="add" size={40} color="#ADD9B2" />
                </View>
                <Text style={styles.label}>New</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 0,
    marginRight: 50,
    marginLeft: 50,
  },
  rowContent: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContent: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  nameDes: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
  boder: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookingTimer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
    height: 80,
    justifyContent: 'start',
    alignItems: 'center',
    padding: 10,
  },
  contentTimer: {
    fontSize: 16,
    textAlign: 'center',
  },
  bgFavorite: {
    backgroundColor: '#ADD9B2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  label: {
    marginTop: -10,
    fontSize: 13,
  },
});

export default HomeScreen;
