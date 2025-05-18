import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StoryItem = ({ story }) => {
  return (
    <TouchableOpacity style={styles.storyContainer}>
      <View style={styles.storyImageContainer}>
        {story.hasStory && !story.viewed ? (
          <LinearGradient
            colors={['#FF8501', '#FF0099', '#FF0099']}
            style={styles.storyGradient}
          >
            <View style={styles.storyImageWrapper}>
              <Image source={{ uri: story.image }} style={styles.storyImage} />
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.storyImageWrapper, story.viewed && styles.viewedStory]}>
            <Image source={{ uri: story.image }} style={styles.storyImage} />
          </View>
        )}
        {story.isYourStory && (
          <View style={styles.addStoryButton}>
            <MaterialCommunityIcons name="plus" size={14} color="#fff" />
          </View>
        )}
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {story.isYourStory ? 'Your Story' : story.username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyImageContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  storyGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
  },
  storyImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  viewedStory: {
    borderColor: '#dbdbdb',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0095f6',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyUsername: {
    fontSize: 12,
    textAlign: 'center',
    color: '#262626',
  },
});

export default StoryItem;