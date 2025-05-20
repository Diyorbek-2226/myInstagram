import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Post = ({ post, navigation }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);

  const navigateToProfile = () => {
    navigation.navigate('UserProfile', {
      userId: post.user.id,
      username: post.user.username,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    navigation.navigate('Comments', { postId: post.id });
  };

  const handleShare = () => {
    Alert.alert(
      'Ulashish',
      'Postni ulashish uchun platformani tanlang',
      [
        {
          text: 'Telegram',
          onPress: () => console.log('Telegram orqali ulashildi'),
        },
        {
          text: 'WhatsApp',
          onPress: () => console.log('WhatsApp orqali ulashildi'),
        },
        {
          text: 'Bekor qilish',
          style: 'cancel',
        },
      ]
    );
  };

  const handleMoreOptions = () => {
    Alert.alert(
      'Post opsiyalari',
      '',
      [
        {
          text: isSaved ? 'Saqlanganlardan o\'chirish' : 'Saqlash',
          onPress: () => setIsSaved(!isSaved),
        },
        {
          text: 'Postni ulashish',
          onPress: handleShare,
        },
        {
          text: 'Postni nusxa ko\'chirish',
          onPress: () => console.log('Post nusxasi ko\'chirildi'),
        },
        {
          text: 'Bekor qilish',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View className="mb-2.5 bg-white">
      <View className="flex-row items-center justify-between p-2.5">
        <TouchableOpacity className="flex-row items-center" onPress={navigateToProfile}>
          <Image 
            source={{ uri: post.user.profilePic }} 
            className="w-8 h-8 rounded-full mr-2.5" 
          />
          <Text className="font-semibold text-gray-800">{post.user.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMoreOptions}>
          <FontAwesome name="ellipsis-h" size={24} color="#262626" />
        </TouchableOpacity>
      </View>
      <Image 
        source={{ uri: post.image }} 
        className="w-full aspect-square" 
      />
      <View className="flex-row justify-between p-2.5">
        <View className="flex-row">
          <TouchableOpacity className="mr-4" onPress={handleLike}>
            <FontAwesome 
              name={isLiked ? "heart" : "heart-o"} 
              size={26} 
              color={isLiked ? "#ed4956" : "#262626"} 
            />
          </TouchableOpacity>
          <TouchableOpacity className="mr-4" onPress={handleComment}>
            <FontAwesome name="comment-o" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <FontAwesome name="share" size={26} color="#262626" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
          <FontAwesome 
            name={isSaved ? "bookmark" : "bookmark-o"} 
            size={26} 
            color="#262626" 
          />
        </TouchableOpacity>
      </View>
      <View className="px-2.5 pb-2.5">
        <Text className="font-semibold mb-1.5 text-gray-800">
          {likesCount.toLocaleString()} likes
        </Text>
        <View className="flex-row mb-1.5">
          <Text className="font-semibold text-gray-800">{post.user.username}</Text>
          <Text className="text-gray-800"> {post.caption}</Text>
        </View>
        <TouchableOpacity onPress={handleComment}>
          <Text className="text-gray-500 mb-1.5">
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
        <Text className="text-xs text-gray-500">{post.timeAgo}</Text>
      </View>
    </View>
  );
};

export default Post;