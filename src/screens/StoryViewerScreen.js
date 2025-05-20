import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { USER_STORIES } from '../Data/data';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);
const AnimatedView = styled(Animated.View);

const { width, height } = Dimensions.get('window');

const StoryViewerScreen = ({ route, navigation }) => {
  const { userId, initialStoryIndex = 0 } = route.params || {};
  const stories = USER_STORIES[userId] || [];
  const userInfo = stories.length > 0 ? { username: stories[0].username, profilePic: stories[0].profilePic } : { username: 'User', profilePic: 'https://randomuser.me/api/portraits/lego/1.jpg' };

  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (stories.length > 0) {
      startStoryTimer(stories[currentStoryIndex].duration);
    }

    return () => { clearTimeout(timeoutRef.current); };
  }, [currentStoryIndex, stories]);

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: stories[currentStoryIndex]?.duration || 5000,
      useNativeDriver: false,
    }).start();
  }, [currentStoryIndex, stories]);

  const startStoryTimer = (duration) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNextStory();
    }, duration);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      progressAnimation.setValue(0);
    } else {
      navigation.goBack();
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      progressAnimation.setValue(0);
    } else {
      navigation.goBack();
    }
  };

  const currentStory = stories[currentStoryIndex];

  if (!currentStory) {
    return (
      <StyledSafeAreaView className="flex-1 bg-black justify-center items-center">
        <StyledText className="text-white text-lg">Story not found or user has no stories.</StyledText>
      </StyledSafeAreaView>
    );
  }

  const progressBars = stories.map((story, index) => (
    <StyledView key={story.id} className="flex-1 h-0.5 bg-white/50 mx-0.5 rounded-full overflow-hidden">
      <AnimatedView
        className="h-full"
        style={{
          width: progressAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
          backgroundColor: index === currentStoryIndex ? '#fff' : (index < currentStoryIndex ? '#fff' : 'rgba(255,255,255,0.5)'),
          ...(index < currentStoryIndex && { width: '100%' }),
        }}
      />
    </StyledView>
  ));

  return (
    <StyledSafeAreaView className="flex-1 ">
      <StatusBar hidden={true} />
      
      {/* Progress Bars */}
      <StyledView className="absolute top-0 left-0 right-0 z-10 flex-row px-2 pt-2">
        {progressBars}
      </StyledView>

      {/* Header */}
      <StyledView className="absolute top-2 left-0 right-0 z-10 flex-row items-center px-2 py-1">
        <StyledImage 
          source={{ uri: userInfo.profilePic }} 
          className="w-7 h-7 rounded-full mr-2" 
        />
        <StyledText className="text-white text-sm font-semibold mr-2">{userInfo.username}</StyledText>
        <StyledText className="text-white/80 text-sm mr-auto">10h</StyledText>
        <StyledTouchable 
          onPress={() => navigation.goBack()} 
          className="p-1 ml-2"
        >
          <Ionicons name="close" size={24} color="#fff" />
        </StyledTouchable>
        <StyledTouchable className="p-1 ml-2">
          <Feather name="more-vertical" size={24} color="#fff" />
        </StyledTouchable>
      </StyledView>

      {/* Story Content */}
      <StyledView className="flex-1 justify-center items-center">
        {currentStory.type === 'image' && (
          <StyledImage 
            source={{ uri: currentStory.uri }} 
            className="w-full h-full" 
            resizeMode="contain" 
          />
        )}
      </StyledView>

      {/* Touch Zones */}
      <StyledView className="absolute inset-0 z-5 flex-row">
        <StyledTouchable 
          className="flex-1" 
          onPress={handlePreviousStory} 
        />
        <StyledTouchable 
          className="flex-1" 
          onPress={handleNextStory} 
        />
      </StyledView>

      {/* Bottom Message and Actions */}
      <StyledView className="absolute bottom-0 left-0 right-0 z-10 flex-row items-center px-2 py-2">
        <StyledTouchable className="p-2 ml-1">
          <Ionicons name="chatbubble-outline" size={24} color="#fff" />
        </StyledTouchable>
        <StyledTextInput
          className="flex-1 bg-white/30 text-white rounded-full px-4 py-2 mx-2 h-10"
          placeholder="Send message"
          placeholderTextColor="#8e8e8e"
        />
        <StyledTouchable className="p-2 mr-1">
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </StyledTouchable>
        <StyledTouchable className="p-2 mr-1">
          <Feather name="send" size={24} color="#fff" />
        </StyledTouchable>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default StoryViewerScreen;