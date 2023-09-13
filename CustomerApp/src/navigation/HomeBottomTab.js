import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HistoryScreen from '../screens/HistoryScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native-animatable';

const Tab = createMaterialBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

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
        component={HistoryStack}
      />

      {/* <Tab.Screen
        name="notification"
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="message" color={color} size={26} />
          ),
        }}
        component={NotificationScreen}
      /> */}

      <Tab.Screen
        name="profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          // shadowColor: colors.background, // iOS
          // elevation: 0, // Android
        },
        headerTintColor: '#000',
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <View>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#fff"
                color="#000"
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor="#fff"
                color="#000"
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
