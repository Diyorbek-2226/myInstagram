import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const THUMB_SIZE = width / 4;

const CONTENT_TYPES = [
  { id: 'post', label: 'POST' },
  { id: 'story', label: 'STORY' },
  { id: 'reel', label: 'REEL' },
  { id: 'live', label: 'LIVE' },
];

const CreatePostScreen = ({ navigation }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
  const [contentType, setContentType] = useState('post');
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isRecentsOpen, setIsRecentsOpen] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === 'granted');
      
      if (status === 'granted') {
        loadMediaItems();
      }
    })();
  }, []);

  const loadMediaItems = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: ['photo', 'video'],
        first: 24,
        sortBy: MediaLibrary.SortBy.creationTime,
      });
      
      setMediaItems(assets);
      if (assets.length > 0) {
        setSelectedImage(assets[0].uri);
      }
    } catch (error) {
      console.log('Error loading media:', error);
    }
  };

  const handleSelectImage = (uri) => {
    if (isMultiSelectMode) {
      if (selectedImages.includes(uri)) {
        setSelectedImages(selectedImages.filter(item => item !== uri));
      } else {
        setSelectedImages([...selectedImages, uri]);
      }
    } else {
      setSelectedImage(uri);
    }
  };

  const handleNext = () => {
    const images = isMultiSelectMode ? selectedImages : [selectedImage];
    
    if (!images || images.length === 0 || !images[0]) {
      Alert.alert("Select an image", "Please select at least one image to continue");
      return;
    }
    
    switch (contentType) {
      case 'post':
        navigation.navigate('EditPost', { images, contentType });
        break;
      case 'story':
        navigation.navigate('StoryCreation', { image: images[0] });
        break;
      case 'reel':
        navigation.navigate('ReelCreation');
        break;
      case 'live':
        navigation.navigate('LiveSetup');
        break;
      default:
        navigation.navigate('EditPost', { images, contentType });
    }
  };

  const toggleMultiSelect = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    setSelectedImages([]);
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      loadMediaItems();
    }
  };

  const renderMediaItem = ({ item }) => {
    const isSelected = isMultiSelectMode 
      ? selectedImages.includes(item.uri)
      : selectedImage === item.uri;
      
    return (
      <TouchableOpacity 
        className={`w-[${THUMB_SIZE}px] h-[${THUMB_SIZE}px] p-px ${isSelected ? 'opacity-70' : ''}`}
        onPress={() => handleSelectImage(item.uri)}
      >
        <Image source={{ uri: item.uri }} className="w-full h-full" />
        {isMultiSelectMode && isSelected && (
          <View className="absolute top-1.5 right-1.5 w-5.5 h-5.5 rounded-full bg-blue-500 justify-center items-center border-2 border-white">
            <Text className="text-white text-xs font-bold">{selectedImages.indexOf(item.uri) + 1}</Text>
          </View>
        )}
        {item.mediaType === 'video' && (
          <View className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 justify-center items-center">
            <Ionicons name="play" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#262626" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">New post</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text className="text-blue-500 text-base font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
      
      {/* Selected Image Preview */}
      <View className="w-full aspect-square bg-gray-100 relative">
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} className="w-full h-full" resizeMode="contain" />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-800">No Image Selected</Text>
          </View>
        )}
        
        {/* Crop/Expand button */}
        <TouchableOpacity className="absolute left-4 bottom-4 w-9 h-9 rounded-full bg-black/50 justify-center items-center">
          <MaterialIcons name="crop-free" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Media Library Section */}
      <View className="flex-1">
        {/* Recents Header */}
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => setIsRecentsOpen(!isRecentsOpen)}
          >
            <Text className="text-gray-800 font-medium mr-1">Recents</Text>
            <Ionicons 
              name={isRecentsOpen ? "chevron-down" : "chevron-up"} 
              size={16} 
              color="#262626" 
            />
          </TouchableOpacity>
          
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="flex-row items-center bg-gray-200 px-2.5 py-1.5 rounded mr-3"
              onPress={toggleMultiSelect}
            >
              <Ionicons name="copy-outline" size={20} color="#262626" />
              <Text className="text-gray-800 text-xs ml-1">SELECT MULTIPLE</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-9 h-9 rounded-full bg-gray-200 justify-center items-center"
              onPress={handleTakePhoto}
            >
              <Ionicons name="camera" size={24} color="#262626" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Media Grid */}
        {isRecentsOpen && (
          <FlatList
            data={mediaItems}
            renderItem={renderMediaItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            initialNumToRender={12}
            className="flex-1"
          />
        )}
      </View>
      
      {/* Content Type Selector */}
      <View className="flex-row justify-around items-center py-4 border-t border-gray-200 bg-white">
        {CONTENT_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            className={`px-4 py-2 rounded-full ${contentType === type.id ? 'bg-gray-200' : ''}`}
            onPress={() => setContentType(type.id)}
          >
            <Text className={`text-sm font-semibold ${contentType === type.id ? 'text-gray-800' : 'text-gray-500'}`}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CreatePostScreen;