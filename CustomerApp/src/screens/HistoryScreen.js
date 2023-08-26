import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Tag from '../components/Tag';
import OrderItem from '../components/Order/OrderItem';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import {useHistoryStore} from '../store/historyStore';

const FILTER_STATUS = [
  {value: 'all', label: 'Tất cả'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'completed', label: 'Completed'},
  {value: 'cancelled', label: 'Cancelled'},
  {value: 'progress', label: 'Progress'},
  {value: 'pending', label: 'Pending'},
  {value: 'rejected', label: 'Rejected'},
];

const HistoryScreen = ({navigation}) => {
  const [filter, setFilter] = useState(FILTER_STATUS[0].value);
  const [loading, setLoading] = useState(true);

  const bookings = useHistoryStore.use.bookings();
  const setBookings = useHistoryStore.use.setBookings();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/booking/me`, {
        params: filter !== 'all' ? {bookingStatus: filter} : {},
      })
      .then(res => {
        setBookings(res.data.bookings);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [filter]);

  return (
    <SafeAreaView>
      <ScrollView className="px-4 pt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            columnGap: 12,
          }}>
          {FILTER_STATUS.map((status, index) => (
            <Tag
              key={index}
              title={status.label}
              active={filter === status.value}
              onClick={() => setFilter(status.value)}
            />
          ))}
        </ScrollView>
        <View className="px-3 pt-6 flex flex-col gap-5 pb-10">
          {bookings?.map(booking => (
            <View key={booking._id} className="shadow">
              <OrderItem
                order={booking}
                onReview={() =>
                  navigation.navigate('Review', {orderId: booking._id})
                }
                onClick={() =>
                  navigation.navigate('OrderDetail', {orderId: booking._id})
                }
              />
            </View>
          ))}
          {loading &&
            [1, 2, 3].map(index => (
              <View key={index} className="h-[130px] bg-gray-200 rounded-2xl" />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
