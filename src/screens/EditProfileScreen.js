import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState('https://randomuser.me/api/portraits/lego/1.jpg');
  const [fullName, setFullName] = useState('Your Full Name');
  const [username, setUsername] = useState('your_username');
  const [bio, setBio] = useState('Your bio goes here');

  const handleSaveProfile = () => {
    Alert.alert('Profile Saved', 'Your profile has been updated!');
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleChangeProfilePic = () => {
    Alert.alert('Change Profile Picture', 'This feature is not yet implemented.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#262626" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Edit Profile</Text>
        <TouchableOpacity onPress={handleSaveProfile}>
          <Text className="text-blue-500 text-base font-semibold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="py-5">
        {/* Profile Picture */}
        <View className="items-center mb-8">
          <Image 
            source={{ uri: profilePic }} 
            className="w-24 h-24 rounded-full mb-2" 
          />
          <TouchableOpacity onPress={handleChangeProfilePic}>
            <Text className="text-blue-500 text-base font-semibold">Change profile photo</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Fields */}
        <View className="px-4">
          <View className="mb-4">
            <Text className="text-xs text-gray-500 mb-1">Name</Text>
            <TextInput
              className="bg-gray-50 text-gray-800 rounded p-2 text-base border border-gray-200"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Name"
              placeholderTextColor="#8e8e8e"
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs text-gray-500 mb-1">Username</Text>
            <TextInput
              className="bg-gray-50 text-gray-800 rounded p-2 text-base border border-gray-200"
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#8e8e8e"
            />
          </View>

          <View className="mb-4">
            <Text className="text-xs text-gray-500 mb-1">Bio</Text>
            <TextInput
              className="bg-gray-50 text-gray-800 rounded p-2 text-base border border-gray-200 h-20"
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              placeholder="Bio"
              placeholderTextColor="#8e8e8e"
            />
          </View>
        </View>

        {/* Other Settings/Information */}
        <View className="mt-5 border-t border-gray-200">
          <TouchableOpacity className="px-4 py-3 border-b border-gray-200">
            <Text className="text-blue-500 text-base">Switch to Professional Account</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3 border-b border-gray-200">
            <Text className="text-blue-500 text-base">Personal Information Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;