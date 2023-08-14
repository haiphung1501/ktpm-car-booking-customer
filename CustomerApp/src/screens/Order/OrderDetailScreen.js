import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import {useHistoryStore} from '../../store/historyStore';

const OrderDetailScreen = ({route, navigation}) => {
  console.log(route.params);
  const currentBooking = useHistoryStore.use.currentBooking();

  return (
    <ScrollView className="px-4 pt-4">
      <View className="bg-white rounded-lg p-3">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold">Tổng tiền</Text>
          <View>
            <Text className="text-green-700 text-right font-bold text-xl">
              25000đ
            </Text>
            <Text className="text-gray-400 text-right font-medium">
              Thanh toán bằng tiền mặt
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Giá</Text>
          <Text className="text-base font-bold">30000đ</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base text-gray-500 font-medium">Giảm giá</Text>
          <Text className="text-base font-bold">-5000đ</Text>
        </View>
      </View>
      <View className="bg-white rounded-lg p-3 mt-4">
        <View className="flex flex-row gap-3 items-center mb-3">
          <View className="w-10 h-10 rounded-full bg-gray-100" />
          <View>
            <Text className="text-base font-bold">Nguyễn Văn A</Text>
          </View>
          <TouchableOpacity className="ml-auto">
            <MaterialIcons name="chevron-right" size={30} color="#CCC" />
          </TouchableOpacity>
        </View>
        <View className="h-[150px] bg-gray-200 w-full flex flex-row items-center justify-center">
          <Text>Show Maps</Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-3">
          <Text className="font-bold">Xe máy</Text>
          <Text className="font-medium text-gray-500">5km - 20 phút</Text>
        </View>
        <View className="relative">
          <View className="border-l-2 absolute top-11 h-10 w-1 border-gray-200 left-2.5" />
          <View className="flex flex-row gap-3 items-start mt-2">
            <MaterialIcons name="gps-fixed" size={24} color="#2F9E44" />
            <View>
              <Text className="font-bold">TP HCM</Text>
              <Text className="text-gray-500">8:00AM</Text>
            </View>
          </View>
          <View className="flex flex-row gap-3 items-start mt-6">
            <MaterialIcons name="location-on" size={24} color="#E03131" />
            <View>
              <Text className="font-bold">TP HCM</Text>
              <Text className="text-gray-500">9:00AM</Text>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        onPress={() => navigation.navigate('Review')}
        wrapperClass="mt-4 py-3 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
        textClass="text-white font-bold text-lg"
        label="Đánh giá"
      />
    </ScrollView>
  );
};

export default OrderDetailScreen;
