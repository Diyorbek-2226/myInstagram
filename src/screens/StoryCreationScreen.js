import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const DRAWING_COLORS = ['#fff', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

const StoryCreationScreen = ({ route, navigation }) => {
  const { image } = route.params;
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const handleClose = () => {
    navigation.goBack();
  };
  
  const handleShare = () => {
    // Handle story sharing
    navigation.navigate('Home', { storyShared: true });
  };
  
  const renderDrawingTools = () => (
    <View style={styles.drawingToolsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.drawingTool}>
          <Ionicons name="text" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <Ionicons name="brush" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <MaterialIcons name="format-shapes" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <Feather name="smile" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <MaterialIcons name="location-on" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <FontAwesome5 name="hashtag" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <MaterialIcons name="music-note" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <MaterialIcons name="link" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.drawingTool}>
          <Ionicons name="poll" size={24} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
  
  const renderColorPicker = () => (
    <View style={styles.colorPickerContainer}>
      {DRAWING_COLORS.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorOption,
            { backgroundColor: color },
            selectedColor === index && styles.selectedColor,
          ]}
          onPress={() => setSelectedColor(index)}
        />
      ))}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Story Preview */}
      <View style={styles.storyPreview}>
        <Image source={{ uri: image }} style={styles.storyImage} />
        
        {isTyping && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, { color: DRAWING_COLORS[selectedColor] }]}
              placeholder="Type something..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              multiline
              autoFocus
              value={text}
              onChangeText={setText}
            />
          </View>
        )}
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="save-outline" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        {renderDrawingTools()}
        {renderColorPicker()}
        
        <View style={styles.sendContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleShare}>
            <Text style={styles.sendText}>Your Story</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Close Friends</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>More</Text>
            <Ionicons name="chevron-down" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textInputContainer: {
    position: 'absolute',
    padding: 20,
    width: '100%',
  },
  textInput: {
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  drawingToolsContainer: {
    marginBottom: 16,
  },
  drawingTool: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 6,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  sendText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  moreText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
});

export default StoryCreationScreen;
