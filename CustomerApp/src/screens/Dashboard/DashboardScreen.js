import React, {useContext, useState} from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Touchable,
  FlatList,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProfitIndicator, ActionCenter} from '../../components/Dashboard';

import {AuthContext} from '../../context/AuthContext';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
  VictoryAxis,
  VictoryLine,
} from 'victory-native';

const GridCard = ({title, value}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const coins = [
  {
    id: 1,
    offerId: '#123456',
    time: '2 mins',
    image: require('../../assets/icons/bitcoin.png'),
    amount: 'Accepted',
    points: '+3.42',
    type: 'I', //I = increase , D = Decrease
    wallet: {
      value: '4273.10',
      crypto: '0.023',
    },
  },
  {
    id: 2,
    offerId: '#123456',
    time: '2 mins',
    image: require('../../assets/icons/ethereum.png'),
    amount: 'Rejected',
    points: '-2.14',
    type: 'D', //I = increase , D = Decrease
    wallet: {
      value: '8200.10',
      crypto: '2',
    },
  },
  {
    id: 3,
    offerId: '#123456',
    time: '2 mins',
    image: require('../../assets/icons/binance.png'),
    amount: 'Accepted',
    points: '+10.22',
    type: 'I', //I = increase , D = Decrease
    wallet: {
      value: '3256',
      crypto: '6.3',
    },
  },
  // {
  //   id: 4,
  //   offerId: 'Doge',
  //   time: 'Doge',
  //   image: require('../../assets/icons/doge.png'),
  //   amount: '2421',
  //   points: '+23.29%',
  //   type: 'I', //I = increase , D = Decrease
  //   wallet: {
  //     value: '4273.10',
  //     crypto: '1203',
  //   },
  // },
  // {
  //   id: 5,
  //   offerId: 'Ripple',
  //   time: 'XRP',
  //   image: require('../../assets/icons/xrp.png'),
  //   amount: '1.23',
  //   points: '-5.29%',
  //   type: 'D', //I = increase , D = Decrease
  //   wallet: {
  //     value: '3219',
  //     crypto: '2800',
  //   },
  // },
];

const DashboardScreen = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSelectingFromDate, setIsSelectingFromDate] = useState(true);

  const showFromDatepicker = () => {
    setIsSelectingFromDate(true);
    setShowDatePicker(true);
  };

  const showToDatepicker = () => {
    setIsSelectingFromDate(false);
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    if (isSelectingFromDate) {
      setFromDate(date);
    } else {
      setToDate(date);
    }
  };

  const data = {
    earnings: [
      {x: 0, y: 0},
      {x: 'Mon', y: 50},
      {x: 'Tue', y: 30},
      {x: 'Wed', y: 20},
      {x: 'Thu', y: 80},
      {x: 'Fri', y: 10},
      {x: 'Sat', y: 40},
      {x: 'Sun', y: 80},
    ],
  };

  return (
    <ScrollView style={{flex: 1}}>
      {/* Statusbar */}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      {/* Header section */}
      <LinearGradient
        start={{x: 0.0, y: 0.4}}
        end={{x: 0.5, y: 1.0}}
        location={[0, 1]}
        colors={['#2D97DA', '#2249D6']}
        style={{flex: 1.2, flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'column',
            marginTop: hp('8%'),
            marginBottom: hp('5%'),
            paddingHorizontal: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            {/* Welcome message and name */}
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: '#fff',
                }}>
                Welcome Back
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#fff',
                  fontSize: 22,
                }}>
                Hoang Mai
              </Text>
            </View>

            {/* Bell icon and profile pic */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="bell" size={20} color="#fff" />
              <Image
                source={require('../../assets/images/bgImg.png')}
                resizeMode="cover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 15,
                }}
              />
            </View>
          </View>

          {/* amount  */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* Amount */}
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 28,
                  fontFamily: 'Roboto-Bold',
                }}>
                $32,7456.68
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Roboto-Regular-Italic',
                  fontSize: 14,
                }}>
                Updated 2 mins ago
              </Text>
            </View>

            {/* profit loss indicator */}
            {/* <ProfitIndicator
              type="I"
              percentage_change={dummyData.portfolio.points}
            /> */}
          </View>
        </View>
      </LinearGradient>

      {/* Body section */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: wp('5%'),
        }}>
        {/* Action Center */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            height: hp('13%'),
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            elevation: 10,
            shadowColor: '#000',
            shadowRadius: 10,
            marginTop: -25,
          }}>
          {/* <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'column',alignItems:'center'}} >
                        <Image style={{height:60,width:60}} source={require('../assets/icons/top-up.png')} />
                        <Text style={{fontSize:15,fontFamily:'Roboto-Bold',color:'#333'}} >Top-up</Text>
                    </TouchableOpacity> */}

          <ActionCenter
            img_src={require('../../assets/icons/top-up.png')}
            img_text="History"
          />

          <ActionCenter
            img_src={require('../../assets/icons/buy.png')}
            img_text="Payments"
          />

          <ActionCenter
            img_src={require('../../assets/icons/withdraw.png')}
            img_text="Cards"
          />

          <ActionCenter
            img_src={require('../../assets/icons/withdraw.png')}
            img_text="Documents"
          />

          <ActionCenter
            img_src={require('../../assets/icons/withdraw.png')}
            img_text="Marketplace"
          />
        </View>

        <TouchableOpacity style={styles.dateRange}>
          <Icon
            name="calendar"
            size={20}
            color="#fff"
            style={styles.calendarIcon}
          />
          <Text style={styles.dateText} onPress={showFromDatepicker}>
            {fromDate.toLocaleDateString()}
          </Text>
          <Text style={styles.dateText}> - </Text>
          <Text style={styles.dateText} onPress={showToDatepicker}>
            {toDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            date={isSelectingFromDate ? fromDate : toDate}
            is24Hour={true}
            onConfirm={handleConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
        )}

        {/* Bookings */}
        <View style={{flexDirection: 'column'}}>
          {/* market text */}
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              fontSize: 22,
              color: '#333',
              marginBottom: 5,
              marginTop: 5,
            }}>
            Bookings
          </Text>
          <View style={styles.row}>
            <GridCard title="Bookings" value="20" />
            <GridCard title="Income" value="$369" />
          </View>
          <View style={styles.row}>
            <GridCard title="Cash" value="$19" />
            <GridCard title="Card" value="$100" />
            <GridCard title="Account" value="$200" />
          </View>
          <View style={{alignItems: 'center'}}>
            <VictoryChart>
              <VictoryLine
                data={data.earnings}
                style={{
                  data: {stroke: 'orange'},
                  parent: {border: '1px solid orange'},
                }}
                animate={{
                  duration: 2000,
                  onLoad: {duration: 1000},
                }}
              />
              <VictoryLegend
                x={Dimensions.get('screen').width / 2.5}
                orientation="horizontal"
                gutter={20}
                data={[
                  {
                    name: 'Earnings',
                    symbol: {
                      fill: 'orange',
                    },
                  },
                ]}
              />
            </VictoryChart>
          </View>
        </View>

        {/* Booking Offers */}
        <View style={{flex: 1, flexDirection: 'column'}}>
          {/* Text and button */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                color: '#333',
                fontSize: 22,
              }}>
              Booking Offers
            </Text>
            <TouchableOpacity onPress={() => console.log('see all')}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#2249DA',
                  fontSize: 20,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal asset slider */}
          {/* <FlatList
            keyExtractor={item => item.id}
            data={coins}
            renderItem={({item}) => (
              <View
                style={{
                  position: 'relative',
                  flexDirection: 'column',
                  height: hp('20%'),
                  width: wp('65%'),
                  borderWidth: 1,
                  borderColor: '#ddd',
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  marginRight: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingTop: 20,
                  }}>
                  <Image style={{height: 25, width: 25}} source={item.image} />
                  <Text
                    style={{
                      fontFamily: 'Roboto-Bold',
                      color: '#333',
                      fontSize: 18,
                    }}>
                    {' '}
                    {item.offerId}/USDT
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Bold',
                        color: '#333',
                        fontSize: 20,
                      }}>
                      {' '}
                      ${item.amount}
                    </Text>
                    <Text>0.0256 BNB</Text>
                  </View>

                  <ProfitIndicator
                    type={item.type}
                    percentage_change={item.points}
                  />
                </View>
              </View>
            )}
            horizontal={true}
          /> */}

          {coins.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                height: hp('10%'),
                width: '100%',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 15,
                justifyContent: 'space-between',
                paddingRight: 10,
                marginBottom: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: '65%'}}
                  resizeMode="contain"
                  source={item.image}
                />

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#333',
                      fontSize: 20,
                    }}>
                    {item.offerId}
                  </Text>
                  <Text>{item.time}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 14,
                    color: '#333',
                    fontWeight: 'bold',
                  }}>
                  {item.amount}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: item.type == 'I' ? 'green' : 'red',
                      fontFamily: 'Roboto-Bold',
                      fontSize: 12,
                    }}>
                    {item.points}
                  </Text>

                  <Icon
                    name={
                      item.type == 'I'
                        ? 'chevron-circle-up'
                        : 'chevron-circle-down'
                    }
                    color={item.type == 'I' ? 'green' : 'red'}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1,
  },
  dateRange: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: 'cyan',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
