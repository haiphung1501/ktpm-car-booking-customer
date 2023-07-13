import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddAddressScreen from '../screens/Home/AddAddressScreen';
import AddressScreen from '../screens/Home/AddressScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="AddAddress"
        options={({route}) => ({
          title: route.params?.isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ',
        })}
        component={AddAddressScreen}
      />
      <Stack.Screen
        name="Address"
        options={{
          title: 'Sổ địa chỉ',
        }}
        component={AddressScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
