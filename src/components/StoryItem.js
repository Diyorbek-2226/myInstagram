import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StoryItem = ({ story, navigation }) => {
  const navigateToStoryViewer = () => {
    console.log('Navigating to StoryViewer with userId:', story.user.username);
    navigation.navigate('StoryViewer', { userId: story.user.username });
  };

  const navigateToProfile = () => {
    if (!story.isYourStory) {
      navigation.navigate('UserProfile', {
        userId: story.userId,
        username: story.username,
      });
    }
  };

  return (
    <TouchableOpacity 
      className="items-center mx-2 w-[70px]"
      onPress={navigateToStoryViewer}
    >
      <View className="relative mb-1.5">
        {story.hasStory && !story.viewed ? (
          <LinearGradient
            colors={['#FF8501', '#FF0099', '#FF0099']}
            className="w-[68px] h-[68px] rounded-[34px] p-0.5"
          >
            <View className="w-16 h-16 rounded-[32px] border-2 border-white overflow-hidden">
              <Image source={{ uri: story.image }} className="w-full h-full" />
            </View>
          </LinearGradient>
        ) : (
          <View className={`w-16 h-16 rounded-[32px] border-2 overflow-hidden ${story.viewed ? 'border-gray-300' : 'border-white'}`}>
            <Image source={{ uri: story.image }} className="w-full h-full" />
          </View>
        )}
        {story.isYourStory && (
          <View className="absolute bottom-0 right-0 bg-blue-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
            <MaterialCommunityIcons name="plus" size={14} color="#fff" />
          </View>
        )}
      </View>
      <Text className="text-xs text-center text-gray-800" numberOfLines={1}>
        {story.isYourStory ? 'Your Story' : story.username}
      </Text>
    </TouchableOpacity>
  );
};

export default StoryItem;