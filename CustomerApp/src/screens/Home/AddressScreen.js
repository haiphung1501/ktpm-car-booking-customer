import {ScrollView, Text, View} from 'react-native';
import Address from '../../components/Home/Address';
import DeleteAddressModal from '../../components/Modal/DeleteAddressModal';
import useOpen from '../../hooks/useOpen';
import CustomButton from '../../components/CustomButton';

const PLACES = {
  favourites: [
    {
      type: 'home',
      name: 'Nhà',
      address: 'TP HCM, 227 nguyen van cu, phuong 4, quan 5',
    },
    {
      type: 'company',
      name: 'Công ty',
      address: 'TP HCM',
    },
  ],
  others: [
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
  ],
};

const AddressScreen = ({navigation}) => {
  const {open, onOpen, onClose} = useOpen();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="font-bold text-lg mb-3">Yêu thích</Text>
        <View className="flex flex-col gap-4">
          {PLACES.favourites.map((item, index) => (
            <View key={index}>
              <Address
                item={item}
                onDelete={onOpen}
                onEdit={() =>
                  navigation.navigate('AddAddress', {
                    isEdit: true,
                    address: item,
                  })
                }
              />
            </View>
          ))}
        </View>
        <Text className="font-bold text-lg mb-3 mt-5">Tất cả</Text>
        <View className="flex flex-col gap-4">
          {PLACES.others.map((item, index) => (
            <View key={index}>
              <Address
                item={item}
                onDelete={onOpen}
                onEdit={() =>
                  navigation.navigate('AddAddress', {
                    isEdit: true,
                    address: item,
                  })
                }
              />
            </View>
          ))}
        </View>
        <CustomButton
          wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
          textClass="text-white font-bold text-lg"
          onPress={() => navigation.navigate('AddAddress')}
          label="Tạo địa chỉ"
        />
      </ScrollView>
      {open === 'open' && (
        <DeleteAddressModal open={open} onClose={onClose} onCancel={onClose} />
      )}
    </View>
  );
};

export default AddressScreen;
