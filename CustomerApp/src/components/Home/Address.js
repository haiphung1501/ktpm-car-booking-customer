import {Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PLACES_ICON} from '../../utils/address';

const Address = ({item, onDelete, onEdit}) => {
  const {name, address, type} = item;

  return (
    <View className="flex flex-row gap-2 items-center">
      <View className="w-14 h-14 rounded-full flex items-center justify-center bg-[#ADD9B2]">
        <Image source={PLACES_ICON[type]} className="w-6 h-6" />
      </View>
      <View className="pl-2 mr-auto">
        <Text className="text-lg font-medium mb-1">{name}</Text>
        <Text className="text-gray-500 font-medium">{address}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete-outline" color="red" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <MaterialIcons
          name="drive-file-rename-outline"
          color="green"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Address;
