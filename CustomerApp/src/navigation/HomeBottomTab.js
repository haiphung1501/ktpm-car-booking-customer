import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HomeStack from './HomeStack';

const Tab = createMaterialBottomTabNavigator();

const HomeBottomTab = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
  return (
    <Tab.Navigator
      initialRouteName="home"
      activeColor="#099268"
      inactiveColor="#868E96"
      barStyle={{
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#f5f5f5',
      }}>
      <Tab.Screen
        name="home"
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="history"
        options={{
          tabBarLabel: 'Lịch sử',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="assignment" color={color} size={26} />
          ),
        }}
        component={HistoryScreen}
      />

      <Tab.Screen
        name="notification"
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="message" color={color} size={26} />
          ),
        }}
        component={NotificationScreen}
      />
      <Tab.Screen
        name="account"
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
        component={NotificationScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;
