import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, TouchableOpacity, View, StyleSheet } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ReelsScreen from '../screens/ReelsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CustomHeader from './CustomHeader';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: ({ navigation }) => <CustomHeader route={route} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#dbdbdb',
          elevation: 0,
          height: Platform.OS === 'ios' ? 65 : 50,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 5,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
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
              size={24}
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
              size={24}
              color="#262626"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButtonContainer}>
              <MaterialCommunityIcons
                name="plus-box"
                size={24}
                color="#262626"
              />
            </View>
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
              size={24}
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
              size={24}
              color="#262626"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  createButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
  },
});

export default TabNavigator;
