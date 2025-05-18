import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data for reels
const REELS_DATA = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/400/800',
    user: {
      username: 'user1',
      profilePic: 'https://picsum.photos/50',
    },
    description: 'Amazing video! 🎥 #reels #instagram',
    likes: '123K',
    comments: '1.2K',
    music: 'Original Audio - user1',
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/400/800',
    user: {
      username: 'user2',
      profilePic: 'https://picsum.photos/51',
    },
    description: 'Check this out! 😎 #trending',
    likes: '45K',
    comments: '834',
    music: 'Popular Song - Artist',
  },
];

const ReelItem = ({ item }) => {
  return (
    <View style={styles.reelContainer}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.video}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <View style={styles.rightControls}>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="heart-outline" size={30} color="#fff" />
            <Text style={styles.controlText}>{item.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="comment-outline" size={30} color="#fff" />
            <Text style={styles.controlText}>{item.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="share" size={30} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="dots-vertical" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
            <Text style={styles.username}>{item.user.username}</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.description}>{item.description}</Text>
          
          <View style={styles.musicSection}>
            <MaterialCommunityIcons name="music" size={16} color="#fff" />
            <Text style={styles.musicText}>{item.music}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function ReelsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        data={REELS_DATA}
        renderItem={({ item }) => <ReelItem item={item} />}
        keyExtractor={item => item.id}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  reelContainer: {
    width: screenWidth,
    height: screenHeight,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  rightControls: {
    position: 'absolute',
    right: 10,
    bottom: 100,
  },
  controlButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  controlText: {
    color: '#fff',
    marginTop: 5,
  },
  bottomSection: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 10,
  },
  followButton: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  followText: {
    color: '#fff',
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    marginBottom: 10,
  },
  musicSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: '#fff',
    marginLeft: 5,
  },
}); 