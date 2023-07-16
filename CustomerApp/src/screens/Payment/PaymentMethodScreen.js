import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';

const METHODS = [
  {
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png',
    title: 'Thanh toán bằng tiền mặt',
    value: 'cash',
  },
  {
    imgUrl:
      'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png',
    title: 'Zalopay',
    value: 'zalopay',
  },
  {
    imgUrl: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
    title: 'Momo',
    value: 'momo',
  },
];

const PaymentMethodScreen = () => {
  const [method, setMethod] = useState('cash');
  return (
    <View className="px-4 pt-6">
      <View className="mb-4">
        <Text className="text-lg font-bold">Chọn phương thức thanh toán</Text>
      </View>
      <View className="flex flex-col gap-3 items-center">
        {METHODS.map((m, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setMethod(m.value)}
            className="flex w-full flex-row items-center gap-3 px-4 py-3 bg-white rounded-lg h-20">
            <View>
              <Image
                source={{uri: m.imgUrl}}
                style={{margin: 0, padding: 0}}
                width={40}
                height={40}
              />
            </View>
            <View className="mr-auto">
              <Text className="text-base font-medium">{m.title}</Text>
            </View>
            <View>
              <RadioButton
                color="#2F9E44"
                value="first"
                status={m.value === method ? 'checked' : 'unchecked'}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <CustomButton
        wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
        textClass="text-white font-bold text-lg"
        label="Xác nhận"
      />
    </View>
  );
};

export default PaymentMethodScreen;
