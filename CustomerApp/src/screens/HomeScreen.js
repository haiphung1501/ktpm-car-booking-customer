import React, { useState }  from 'react';
import { View, Image, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

// import MapView, { Marker } from 'react-native-maps'; // map

import Header from '../components/header';
import NavigationBar from '../components/navBar';
import InputField from '../components/InputField';

const HomeScreen = ({  }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [destination, setDestination] = useState(null);

  const handleChangeTab = () => {
    // setActiveTab(tab);
    // Xử lý thay đổi tab
    // ...
  };

  return (
    <View style={styles.container}>
      <Header/>
      
      <View style ={styles.body}>
      {/* input destination */}
        <InputField
          label={'Destination'}
          icon={
            <Image
              source={require('../assets/images/destination.png')}
              style={{marginRight: 5}}
            />
          }
          inputType="text"
          fieldButtonLabel={''}
          fieldButtonFunction={() => {}}
          value={destination}
          onChangeText={text => setDestination(text)}
        />

        {/* Recently place will be changed loop to display and maximum is 3 places */}
        <Text style={styles.title}>Recently</Text>
        <TouchableOpacity>
          <View style={styles.rowContent}>
            <Image
              source={require('../assets/images/recent.png')}
              style={{marginLeft: 5, marginRight: 5, width: 25, height: 25}}
            />
            <View style={styles.columnContent}>
              <Text style={styles.nameDes}>DH KHTN</Text>
              <Text style={styles.address}>227 Nguyen Van Cu</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <View style={styles.boder}/>
        <TouchableOpacity>
        <View style={styles.rowContent}>
          <Image
            source={require('../assets/images/recent.png')}
            style={{marginLeft: 5, marginRight: 5, width: 25, height: 25}}
          />
          <View style={styles.columnContent}>
            <Text style={styles.nameDes}>DH KT</Text>
            <Text style={styles.address}>Nguyen Tri Phuong, Q10</Text>
          </View>
        </View>
        </TouchableOpacity>

        <View style={styles.boder}/>
        <TouchableOpacity>
          <View style={styles.rowContent}>
            <Image
              source={require('../assets/images/recent.png')}
              style={{marginLeft: 5, marginRight: 5, width: 25, height: 25}}
            />
            <View style={styles.columnContent}>
              <Text style={styles.nameDes}>Ba Den Mountain</Text>
              <Text style={styles.address}>TP Tay Ninh</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Button booking timer  */}
        <Text style={styles.title}>Booking timer</Text>
        <TouchableOpacity>
          <View style={styles.bookingTimer}>
            <Image
                source={require('../assets/images/driver.png')}
                style={{marginLeft: 5, marginRight: 5, width: 30, height: 30}}
              />
            <Text style={{fontSize: 16, textAlign: 'center',}}>Book a car by the hour</Text>
          </View>
        </TouchableOpacity>

        {/* Favorite Place will be changed loop to display  */}
        <Text style={styles.title}>Favorite Place</Text>
        <View style={styles.rowContent}>
          <TouchableOpacity style={{alignItems: 'center',}}>
            <View style={styles.bgFavorite}>
              <Image
                source={require('../assets/images/homeFav.png')}
                style={{marginLeft: 5, marginRight: 5, width: 20, height: 20}}
              />
            </View>
            <Text style={styles.label}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center',}}>
            <View style={styles.bgFavorite}>
              <Image
                source={require('../assets/images/companyFav.png')}
                style={{marginLeft: 5, marginRight: 5, width: 20, height: 20}}
              />
            </View>
            <Text style={styles.label}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center',}}>
            <View style={styles.bgFavorite}>
              <Image
                source={require('../assets/images/bookmarkFav.png')}
                style={{marginLeft: 5, marginRight: 5, width: 20, height: 20}}
              />
            </View>
            <Text style={styles.label}>New</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <NavigationBar activeTab={activeTab} onChangeTab={handleChangeTab} />
    </View>
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
    marginStart: -10,
  },
  bookingTimer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#7CF289',
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
    marginTop: 30,
    margin: 10,
  },
  label: {
    marginTop: -10,
    fontSize: 13,
  },
});

export default HomeScreen;