import {Text, TextInput, View} from 'react-native';
import CustomButton from '../../components/CustomButton';

const AddAddressScreen = ({route}) => {
  const {isEdit, address} = route.params || {};
  return (
    <View className="bg-white p-4">
      <Text className="mb-2 font-medium text-base">Tên địa chỉ:</Text>
      <TextInput
        value={address?.name}
        className="border p-4 border-gray-300 rounded-lg"
        placeholder="Tên địa chỉ"
      />
      <Text className="mt-4 mb-2 font-medium text-base">Địa chỉ:</Text>
      <TextInput
        value={address?.address}
        className="border p-4 border-gray-300 rounded-lg"
        placeholder="Địa chỉ"
      />

      <CustomButton
        wrapperClass="mt-6 p-4 mb-0 rounded-lg bg-green-600 flex flex-row items-center justify-center"
        textClass="text-white font-bold text-lg"
        label={isEdit ? 'Lưu địa chỉ' : 'Thêm địa chỉ'}
      />
      {isEdit && (
        <CustomButton
          wrapperClass="mt-4 p-4 rounded-lg border-2 bg-white border-red-500 flex flex-row items-center justify-center"
          textClass="text-red-500 font-bold text-lg"
          label="Xoá địa chỉ"
        />
      )}
    </View>
  );
};

export default AddAddressScreen;
