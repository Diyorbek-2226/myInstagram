import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
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
      loadMediaItems(); // Refresh media library to include the new photo
    }
  };

  const renderMediaItem = ({ item }) => {
    const isSelected = isMultiSelectMode 
      ? selectedImages.includes(item.uri)
      : selectedImage === item.uri;
      
    return (
      <TouchableOpacity 
        style={[styles.mediaItem, isSelected && styles.selectedMediaItem]} 
        onPress={() => handleSelectImage(item.uri)}
      >
        <Image source={{ uri: item.uri }} style={styles.mediaThumbnail} />
        {isMultiSelectMode && isSelected && (
          <View style={styles.selectionIndicator}>
            <Text style={styles.selectionNumber}>{selectedImages.indexOf(item.uri) + 1}</Text>
          </View>
        )}
        {item.mediaType === 'video' && (
          <View style={styles.videoBadge}>
            <Ionicons name="play" size={12} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderContentTypeSelector = () => (
    <View style={styles.contentTypeContainer}>
      {CONTENT_TYPES.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.contentTypeButton,
            contentType === type.id && styles.activeContentType
          ]}
          onPress={() => setContentType(type.id)}
        >
          <Text style={[
            styles.contentTypeText,
            contentType === type.id && styles.activeContentTypeText
          ]}>
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New post</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
      
      {/* Selected Image Preview */}
      <View style={styles.previewContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={styles.noImageText}>No Image Selected</Text>
          </View>
        )}
        
        {/* Crop/Expand button */}
        <TouchableOpacity style={styles.expandButton}>
          <MaterialIcons name="crop-free" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Media Library Section */}
      <View style={styles.libraryContainer}>
        {/* Recents Header */}
        <View style={styles.recentsHeader}>
          <TouchableOpacity 
            style={styles.recentsDropdown}
            onPress={() => setIsRecentsOpen(!isRecentsOpen)}
          >
            <Text style={styles.recentsText}>Recents</Text>
            <Ionicons 
              name={isRecentsOpen ? "chevron-down" : "chevron-up"} 
              size={16} 
              color="#fff" 
            />
          </TouchableOpacity>
          
          <View style={styles.libraryActions}>
            <TouchableOpacity 
              style={styles.multiSelectButton}
              onPress={toggleMultiSelect}
            >
              <Ionicons name="copy-outline" size={20} color="#fff" />
              <Text style={styles.multiSelectText}>SELECT MULTIPLE</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
              <Ionicons name="camera" size={24} color="#fff" />
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
            style={styles.mediaGrid}
          />
        )}
      </View>
      
      {/* Content Type Selector */}
      {renderContentTypeSelector()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#262626',
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    color: '#0095f6',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    width: width,
    height: width,
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  noImagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#fff',
    fontSize: 16,
  },
  expandButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryContainer: {
    flex: 1,
  },
  recentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#262626',
    borderBottomWidth: 0.5,
  },
  recentsDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  libraryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  multiSelectText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  cameraButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaGrid: {
    flex: 1,
  },
  mediaItem: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    padding: 1,
  },
  selectedMediaItem: {
    opacity: 0.7,
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectionNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#262626',
    backgroundColor: '#000',
  },
  contentTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeContentType: {
    backgroundColor: '#262626',
  },
  contentTypeText: {
    color: '#8e8e8e',
    fontSize: 14,
    fontWeight: '600',
  },
  activeContentTypeText: {
    color: '#fff',
  },
});

export default CreatePostScreen;
