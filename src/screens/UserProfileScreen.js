import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledFlatList = styled(FlatList);
const StyledSafeAreaView = styled(SafeAreaView);

const { width } = Dimensions.get('window');
const THUMBNAIL_SIZE = width / 3 - 2;

// Define USERS data before using it
const USERS = {
  user1: {
    id: "user1",
    username: "travel_lover",
    fullName: "Travel Enthusiast",
    profilePic: "https://randomuser.me/api/portraits/women/43.jpg",
    bio: "Travel blogger | Adventure seeker | 30+ countries visited ✈️ 🌎",
    postsCount: 245,
    followers: "423K",
    following: 512,
    isVerified: true,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/10/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/11/300/300", isVideo: true },
      { id: "p3", image: "https://picsum.photos/id/12/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/13/300/300", isVideo: false },
      { id: "p5", image: "https://picsum.photos/id/14/300/300", isVideo: true },
      { id: "p6", image: "https://picsum.photos/id/15/300/300", isVideo: false },
    ],
  },
  user2: {
    id: "user2",
    username: "nature_photography",
    fullName: "Nature Photography",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Capturing the beauty of nature 📸 | Professional photographer",
    postsCount: 178,
    followers: "98K",
    following: 324,
    isVerified: false,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/16/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/17/300/300", isVideo: false },
      { id: "p3", image: "https://picsum.photos/id/18/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/19/300/300", isVideo: true },
      { id: "p5", image: "https://picsum.photos/id/20/300/300", isVideo: false },
      { id: "p6", image: "https://picsum.photos/id/21/300/300", isVideo: false },
    ],
  },
  user3: {
    id: "user3",
    username: "fitness_goals",
    fullName: "Fitness Goals",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Fitness coach | Healthy lifestyle advocate | Join my workout program 💪",
    postsCount: 312,
    followers: "156K",
    following: 287,
    isVerified: true,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/22/300/300", isVideo: true },
      { id: "p2", image: "https://picsum.photos/id/23/300/300", isVideo: false },
      { id: "p3", image: "https://picsum.photos/id/24/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/25/300/300", isVideo: true },
      { id: "p5", image: "https://picsum.photos/id/26/300/300", isVideo: false },
      { id: "p6", image: "https://picsum.photos/id/27/300/300", isVideo: false },
    ],
  },
  user4: {
    id: "user4",
    username: "tech_reviews",
    fullName: "Tech Reviews",
    profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
    bio: "Tech enthusiast | Gadget reviews | Latest tech news 📱 💻",
    postsCount: 156,
    followers: "75K",
    following: 412,
    isVerified: false,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/28/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/29/300/300", isVideo: true },
      { id: "p3", image: "https://picsum.photos/id/30/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/31/300/300", isVideo: false },
      { id: "p5", image: "https://picsum.photos/id/32/300/300", isVideo: true },
      { id: "p6", image: "https://picsum.photos/id/33/300/300", isVideo: false },
    ],
  },
};

const UserProfileScreen = ({ route, navigation }) => {
  const params = route?.params || {};
  const { userId = 'user1', username = 'user' } = params;

  const userData = USERS[userId] || {
    id: userId,
    username,
    fullName: "Instagram User",
    profilePic: "https://randomuser.me/api/portraits/lego/1.jpg",
    bio: "No bio yet",
    postsCount: 0,
    followers: "0",
    following: 0,
    isVerified: false,
    posts: [],
  };

  const [activeTab, setActiveTab] = useState("grid");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const renderPostItem = ({ item }) => (
    <StyledTouchable style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, margin: 1 }}>
      <StyledImage source={{ uri: item.image }} className="w-full h-full" />
      {item.isVideo && (
        <StyledView className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
          <Ionicons name="play" size={16} color="#fff" />
        </StyledView>
      )}
    </StyledTouchable>
  );

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <StyledView className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <StyledTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </StyledTouchable>
        <StyledText className="text-black text-base font-semibold">
          {userData.username}
        </StyledText>
        <StyledTouchable>
          <Feather name="more-vertical" size={24} color="#000" />
        </StyledTouchable>
      </StyledView>

      {/* Rest of your component remains the same as in the previous white theme version */}
      {/* ... */}
      
    </StyledSafeAreaView>
  );
};

export default UserProfileScreen;