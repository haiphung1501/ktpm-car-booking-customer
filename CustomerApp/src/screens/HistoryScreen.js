import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import Tag from '../components/Tag';
import OrderItem from '../components/Order/OrderItem';
import {useState} from 'react';

const FILTER_STATUS = [
  {value: 'all', label: 'Tất cả'},
  {value: 'ongoing', label: 'Ongoing'},
  {value: 'completed', label: 'Completed'},
  {value: 'cancel', label: 'Cancel'},
];

const ORDER = {
  status: 'ongoing',
  createdAt: new Date(),
  type: 'motobike',
  address: 'TP HCM',
  price: 20000,
  user: {
    name: 'Vy',
  },
};

const HistoryScreen = ({navigation}) => {
  const [filter, setFilter] = useState(FILTER_STATUS[0].value);

  return (
    <SafeAreaView>
      <ScrollView className="px-4 pt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            columnGap: 12,
          }}>
          {FILTER_STATUS.map(status => (
            <Tag
              title={status.label}
              active={filter === status.value}
              onClick={() => setFilter(status.value)}
            />
          ))}
        </ScrollView>
        <View className="px-3 pt-6 flex flex-col gap-5 pb-10">
          {[1, 2, 3, 4, 5].map(index => (
            <View key={index} className="shadow">
              <OrderItem
                order={ORDER}
                onReview={() => navigation.navigate('Review', {order: ORDER})}
                onClick={() => navigation.navigate('OrderDetail')}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
