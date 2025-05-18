import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ReelsScreen from '../screens/ReelsScreen';
import CustomHeader from './CustomHeader';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => <CustomHeader route={route} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#dbdbdb',
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          backgroundColor: '#fff',
        },
        tabBarActiveTintColor: '#262626',
        tabBarInactiveTintColor: '#262626',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={26}
              color="#262626"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="magnify"
              size={26}
              color="#262626"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Reels" 
        component={ReelsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'play-box' : 'play-box-outline'}
              size={26}
              color="#262626"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-circle' : 'account-circle-outline'}
              size={26}
              color="#262626"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;