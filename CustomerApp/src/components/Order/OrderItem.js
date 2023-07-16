import {Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../CustomButton';

const STATUS_TEXT = {
  ongoing: 'Chuyến đi đang diễn ra',
  completed: 'Chuyến đi hoàn thành',
  cancel: 'Chuyến đi đã huỷ',
};

const OrderItem = ({order, onReview, onCancel, onClick}) => {
  const {price, createdAt, type, address, status} = order;
  return (
    <TouchableOpacity
      onPress={onClick}
      className="flex flex-row items-center gap-3 px-3 py-2 bg-white rounded-2xl">
      <View>
        <View className="w-20 h-20 bg-gray-50 rounded-lg">
          <Text>Image</Text>
        </View>
        <Text className="text-gray-400 text-center font-medium mt-1">
          {createdAt.toLocaleDateString()}
        </Text>
      </View>
      <View>
        <Text className="text-teal-600 font-bold">{STATUS_TEXT[status]}</Text>
        <Text className="text-lg font-medium">{address}</Text>

        <Text className="text-teal-600 text-xl font-bold mb-2">
          {price} VND
        </Text>
        <View className="flex flex-row items-center ml-1">
          {status === 'ongoing' && (
            <CustomButton
              onPress={onCancel}
              wrapperClass="py-2 px-3 m-0 mr-2 rounded-lg bg-teal-600 border-2 border-transparent flex flex-row items-center justify-center"
              textClass="text-white font-bold text-sm"
              label="Huỷ"
            />
          )}
          <CustomButton
            onPress={onReview}
            wrapperClass="p-2 m-0 rounded-lg bg-white border-2 border-teal-600 flex flex-row items-center justify-center"
            textClass="text-teal-600 font-bold text-sm"
            label="Đánh giá"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
