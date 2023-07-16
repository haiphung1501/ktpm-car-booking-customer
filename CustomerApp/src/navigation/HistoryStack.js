import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HistoryScreen from '../screens/HistoryScreen';
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';
import ReviewScreen from '../screens/Order/ReviewScreen';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        options={{
          title: 'Lịch sử đặt xe',
        }}
        component={HistoryScreen}
      />
      <Stack.Screen
        name="OrderDetail"
        options={{
          title: 'Chi tiết chuyến đi',
        }}
        component={OrderDetailScreen}
      />
      <Stack.Screen
        name="Review"
        options={{
          title: 'Đánh giá',
        }}
        component={ReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;
