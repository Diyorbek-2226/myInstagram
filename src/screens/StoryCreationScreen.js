import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);
const StyledImage = styled(Image);
const StyledSafeAreaView = styled(SafeAreaView);

const { width, height } = Dimensions.get('window');

const DRAWING_COLORS = ['#fff', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

const StoryCreationScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const handleClose = () => navigation.goBack();
  const handleShare = () => navigation.navigate('Home', { storyShared: true });
  
  const renderDrawingTools = () => (
    <StyledView className="mb-4">
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['text', 'brush', 'format-shapes', 'smile', 'location-on', 'hashtag', 'music-note', 'link', 'poll'].map((icon, index) => (
          <StyledTouchable 
            key={index}
            className="w-10 h-10 rounded-full bg-black/50 justify-center items-center mr-3"
          >
            {index === 0 && <Ionicons name={icon} size={24} color="#fff" />}
            {index === 1 && <Ionicons name={icon} size={24} color="#fff" />}
            {index === 2 && <MaterialIcons name={icon} size={24} color="#fff" />}
            {index === 3 && <Feather name={icon} size={24} color="#fff" />}
            {index === 4 && <MaterialIcons name={icon} size={24} color="#fff" />}
            {index === 5 && <FontAwesome5 name={icon} size={20} color="#fff" />}
            {index === 6 && <MaterialIcons name={icon} size={24} color="#fff" />}
            {index === 7 && <MaterialIcons name={icon} size={24} color="#fff" />}
            {index === 8 && <Ionicons name={icon} size={24} color="#fff" />}
          </StyledTouchable>
        ))}
      </StyledScrollView>
    </StyledView>
  );
  
  const renderColorPicker = () => (
    <StyledView className="flex-row justify-center mb-4">
      {DRAWING_COLORS.map((color, index) => (
        <StyledTouchable
          key={index}
          className={`w-7 h-7 rounded-full mx-1.5 ${selectedColor === index ? 'border-2 border-white' : ''}`}
          style={{ backgroundColor: color }}
          onPress={() => setSelectedColor(index)}
        />
      ))}
    </StyledView>
  );
  
  return (
    <StyledSafeAreaView className="flex-1 bg-black">
      {/* Story Preview */}
      <StyledView className="absolute inset-0 justify-center items-center">
        <StyledImage source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        
        {isTyping && (
          <StyledView className="absolute p-5 w-full">
            <StyledTextInput
              className="text-2xl text-center"
              style={{ 
                color: DRAWING_COLORS[selectedColor],
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
              placeholder="Type something..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
            />
          </StyledView>
        )}
      </StyledView>
      
      {/* Header */}
      <StyledView className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4 z-10">
        <StyledTouchable onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </StyledTouchable>
        
        <StyledView className="flex-row">
          <StyledTouchable className="ml-4">
            <Ionicons name="save-outline" size={24} color="#fff" />
          </StyledTouchable>
          
          <StyledTouchable className="ml-4">
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </StyledTouchable>
        </StyledView>
      </StyledView>
      
      {/* Footer */}
      <StyledView className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {renderDrawingTools()}
        {renderColorPicker()}
        
        <StyledView className="flex-row items-center">
          <StyledTouchable 
            className="flex-row items-center bg-black/50 px-4 py-2 rounded-full mr-3"
            onPress={handleShare}
          >
            <StyledText className="text-white text-sm mr-1">Your Story</StyledText>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </StyledTouchable>
          
          <StyledTouchable className="flex-row items-center bg-black/50 px-4 py-2 rounded-full mr-3">
            <StyledText className="text-white text-sm mr-1">Close Friends</StyledText>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </StyledTouchable>
          
          <StyledTouchable className="flex-row items-center bg-black/50 px-3 py-2 rounded-full">
            <StyledText className="text-white text-sm mr-1">More</StyledText>
            <Ionicons name="chevron-down" size={16} color="#fff" />
          </StyledTouchable>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default StoryCreationScreen;