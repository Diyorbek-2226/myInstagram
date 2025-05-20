import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock comments data
const COMMENTS = [
  {
    id: '1',
    user: {
      username: 'user1',
      profilePic: 'https://picsum.photos/100',
    },
    text: 'Bu juda chiroyli! 😍',
    timeAgo: '2h',
    likes: 12,
  },
  {
    id: '2',
    user: {
      username: 'user2',
      profilePic: 'https://picsum.photos/101',
    },
    text: 'Men ham shunday qilmoqchiman!',
    timeAgo: '1h',
    likes: 5,
  },
];

const CommentsScreen = ({ route, navigation }) => {
  const { postId, type = 'post' } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(COMMENTS);

  const handleSend = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        user: {
          username: 'current_user',
          profilePic: 'https://picsum.photos/102',
        },
        text: comment.trim(),
        timeAgo: 'just now',
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const renderComment = ({ item }) => (
    <View className="flex-row mb-4">
      <Image 
        source={{ uri: item.user.profilePic }} 
        className="w-8 h-8 rounded-full mr-2.5"
      />
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="font-semibold text-gray-800 mr-2">{item.user.username}</Text>
          <Text className="text-xs text-gray-500">{item.timeAgo}</Text>
        </View>
        <Text className="text-gray-800 mb-1">{item.text}</Text>
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Text className="text-blue-500 text-xs mr-4">Like</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-500 text-xs">Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-2.5 border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#262626" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-800">Comments</Text>
        <View className="w-6" />
      </View>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
        className="flex-1"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-row items-center p-2.5 border-t border-gray-300"
      >
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2.5 max-h-25"
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity 
          className={`p-1 ${!comment.trim() ? 'opacity-50' : ''}`}
          onPress={handleSend}
          disabled={!comment.trim()}
        >
          <MaterialCommunityIcons 
            name="send" 
            size={24} 
            color={comment.trim() ? '#0095f6' : '#8e8e8e'} 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;