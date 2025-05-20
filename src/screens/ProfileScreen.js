import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Temporary data for testing
const USER = {
  username: 'diyor.bek2226',
  name: 'Diyorbek Ochilov',
  profilePic: 'https://picsum.photos/100',
  posts: 37,
  followers: 338,
  following: 384,
  bio: "Bandasin qo'lasin yaratgan egam o'zidan o'zgaga muxtoj\nqilmasin oxirki bir kunlik umring qolsa ham hayota\nhech kimga kuning qolmasin.\nSee translation\n🔗 t.me/@Diyorbek051002\n@ diyor.bek2226",
};

const POSTS = [
  { id: '1', image: 'https://picsum.photos/id/1015/300/300' },
  { id: '2', image: 'https://picsum.photos/id/1016/300/300' },
  { id: '3', image: 'https://picsum.photos/id/1018/300/300' },
  { id: '4', image: 'https://picsum.photos/id/1019/300/300' },
  { id: '5', image: 'https://picsum.photos/id/1020/300/300' },
  { id: '6', image: 'https://picsum.photos/id/1021/300/300' },
];

const HIGHLIGHTS = [
  { id: '1', image: 'https://picsum.photos/id/237/100/100', label: 'New' },
  { id: '2', image: 'https://picsum.photos/id/238/100/100', label: 'kurdoşlar' },
  { id: '3', image: 'https://picsum.photos/id/239/100/100', label: 'Aktualnoe' },
];

const ProfileScreen = ({ navigation }) => {
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('grid');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleShareProfile = () => {
    Alert.alert('Share Profile', 'This will share your profile');
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    setIsMenuVisible(false);
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setIsMenuVisible(true),
        },
        {
          text: 'Logout',
          onPress: () => {
            setIsMenuVisible(false);
            navigation.replace('Login');
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleMenuItemPress = (action) => {
    setIsMenuVisible(false);
    action();
  };

  const renderSettingItem = ({ icon, title, value, onValueChange, type = 'switch', onPress }) => (
    <TouchableOpacity 
      className="flex-row justify-between items-center py-3 px-4 border-b border-gray-200"
      onPress={onPress} 
      disabled={!onPress && type === 'arrow'}
    >
      <View className="flex-row items-center">
        <MaterialCommunityIcons name={icon} size={24} color="#262626" />
        <Text className="text-base text-gray-800 ml-2">{title}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#dbdbdb', true: '#0095f6' }}
          thumbColor="#fff"
        />
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={24} color="#8e8e8e" />
      )}
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <TouchableOpacity className="w-1/3 aspect-square p-0.5">
      <Image source={{ uri: item.image }} className="w-full h-full" />
    </TouchableOpacity>
  );

  const renderHighlightItem = ({ item }) => (
    <TouchableOpacity className="items-center mx-2">
      <Image source={{ uri: item.image }} className="w-16 h-16 rounded-full bg-gray-800 mb-1" />
      <Text className="text-xs text-gray-800">{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text className="text-lg font-semibold text-gray-800">Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <FontAwesome name="edit" size={24} color="#262626" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Info */}
        <View className="flex-row p-4 items-center">
          <Image source={{ uri: USER.profilePic }} className="w-20 h-20 rounded-full mr-5" />
          <View className="flex-1 flex-row justify-around">
            <View className="items-center">
              <Text className="text-lg font-semibold text-gray-800">{USER.posts}</Text>
              <Text className="text-xs text-gray-500">posts</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-semibold text-gray-800">{USER.followers}</Text>
              <Text className="text-xs text-gray-500">followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-semibold text-gray-800">{USER.following}</Text>
              <Text className="text-xs text-gray-500">following</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View className="px-4 mb-4">
          <Text className="text-sm font-semibold text-gray-800 mb-1">{USER.name}</Text>
          <Text className="text-sm text-gray-800 leading-5">{USER.bio}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row px-4 mb-5">
          <TouchableOpacity 
            className="flex-1 bg-gray-50 py-2 rounded mr-2 items-center border border-gray-200"
            onPress={handleEditProfile}
          >
            <Text className="text-gray-800 text-center font-semibold">Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-gray-50 py-2 rounded items-center border border-gray-200"
            onPress={handleShareProfile}
          >
            <Text className="text-gray-800 text-center font-semibold">Share profile</Text>
          </TouchableOpacity>
        </View>

        {/* Highlights */}
        <View className="py-2 border-b border-gray-800 mb-2">
          <FlatList
            data={HIGHLIGHTS}
            renderItem={renderHighlightItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-800">
          <TouchableOpacity
            className={`flex-1 items-center py-2 ${activeTab === 'grid' ? 'border-b border-white' : ''}`}
            onPress={() => setActiveTab('grid')}
          >
            <MaterialCommunityIcons 
              name="grid" 
              size={24} 
              color={activeTab === 'grid' ? '#fff' : '#8e8e8e'} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center py-2 ${activeTab === 'reels' ? 'border-b border-white' : ''}`}
            onPress={() => setActiveTab('reels')}
          >
            <MaterialCommunityIcons 
              name="play-box-outline" 
              size={24} 
              color={activeTab === 'reels' ? '#fff' : '#8e8e8e'} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center py-2 ${activeTab === 'tagged' ? 'border-b border-white' : ''}`}
            onPress={() => setActiveTab('tagged')}
          >
            <MaterialCommunityIcons 
              name="account-box-outline" 
              size={24} 
              color={activeTab === 'tagged' ? '#fff' : '#8e8e8e'} 
            />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        {activeTab === 'grid' && (
          <FlatList
            data={POSTS}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      {/* Settings Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-end" 
          activeOpacity={1} 
          onPress={toggleMenu}
        >
          <View className="bg-white pt-2 rounded-t-2xl">
            <View className="flex-row justify-between items-center px-4 pb-2 border-b border-gray-200 mb-2">
              <Text className="text-lg font-semibold text-gray-800">Settings</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="close" size={24} color="#262626" />
              </TouchableOpacity>
            </View>

            {renderSettingItem({
              icon: 'account-lock',
              title: 'Private Account',
              value: isPrivateAccount,
              onValueChange: setIsPrivateAccount,
            })}

            {renderSettingItem({
              icon: 'bell-outline',
              title: 'Notifications',
              value: isNotificationsEnabled,
              onValueChange: setIsNotificationsEnabled,
            })}

            {renderSettingItem({
              icon: 'security',
              title: 'Security',
              type: 'arrow',
              onPress: () => handleMenuItemPress(() => Alert.alert('Security Settings', 'This will open security settings'))
            })}

            {renderSettingItem({
              icon: 'help-circle-outline',
              title: 'Help',
              type: 'arrow',
              onPress: () => handleMenuItemPress(() => Alert.alert('Help Center', 'This will open help center'))
            })}

            {renderSettingItem({
              icon: 'information-outline',
              title: 'About',
              type: 'arrow',
              onPress: () => handleMenuItemPress(() => Alert.alert('About App', 'This will show app information'))
            })}

            <TouchableOpacity 
              className="flex-row items-center py-3 px-4" 
              onPress={() => handleMenuItemPress(handleLogout)}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="logout" size={24} color="#262626" />
                <Text className="text-base text-gray-800 ml-2">Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;