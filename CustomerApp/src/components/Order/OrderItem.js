import {Image, Text, TouchableOpacity, View} from 'react-native';
import {BusIcon, CarIcon, MotobikeIcon} from '../../utils/sources';
import CustomButton from '../CustomButton';

const STATUS_TEXT = {
  progress: 'Chuyến đi đang diễn ra',
  completed: 'Chuyến đi hoàn thành',
  cancel: 'Chuyến đi đã huỷ',
  pending: 'Tìm kiếm chuyến đi',
  accepted: 'Đã tìm thấy tài xế',
  rejected: 'Chuyến đi đã huỷ',
  cancelled: 'Tài xế đã huỷ chuyến đi',
};

const ImageType = {
  car: CarIcon,
  motorbike: MotobikeIcon,
  bus: BusIcon,
};

const OrderItem = ({order, onReview, onCancel, onClick}) => {
  const {price, pickupTime, carType, bookingStatus, pickupAddress, isReviewed} =
    order;

  return (
    <TouchableOpacity
      onPress={onClick}
      className="flex flex-row items-center gap-3 px-3 py-2 bg-white rounded-2xl">
      <View>
        <View className="w-20 h-20 bg-gray-50 rounded-lg">
          <Image
            source={ImageType[carType]}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Text className="text-gray-400 text-center font-medium mt-1">
          {pickupTime
            ? new Date(pickupTime).toLocaleDateString()
            : 'XX/XX/XXXX'}
        </Text>
      </View>
      <View className="w-[210px]">
        <Text className="text-teal-600 font-bold">
          {STATUS_TEXT[bookingStatus]}
        </Text>
        <Text className="text-lg font-medium">{pickupAddress?.name}</Text>

        <Text className="text-teal-600 text-xl font-bold mb-2">
          {price.toLocaleString('en-US')} VND
        </Text>
        <View className="flex flex-row items-center ml-1">
          {bookingStatus === 'pending' && (
            <CustomButton
              onPress={onCancel}
              wrapperClass="py-2 flex-1 px-3 m-0 mr-2 rounded-lg bg-teal-600 border-2 border-transparent flex flex-row items-center justify-center"
              textClass="text-white font-bold text-sm"
              label="Huỷ"
            />
          )}
          {bookingStatus === 'completed' && !isReviewed && (
            <CustomButton
              onPress={onReview}
              wrapperClass="p-2 m-0 flex-1 rounded-lg bg-white border-2 border-teal-600 flex flex-row items-center justify-center"
              textClass="text-teal-600 font-bold text-sm whitespace-nowrap"
              label="Đánh giá"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
