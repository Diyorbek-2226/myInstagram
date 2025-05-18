import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Post = ({ post }) => {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={{ uri: post.user.profilePic }} style={styles.profilePic} />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#262626" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="heart-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="comment-outline" size={26} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="share-outline" size={26} color="#262626" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bookmark-outline" size={26} color="#262626" />
        </TouchableOpacity>
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
        <View style={styles.captionContainer}>
          <Text>
            <Text style={styles.username}>{post.user.username}</Text>
            {' '}{post.caption}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.comments}>
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    color: '#262626',
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  postFooter: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  likes: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#262626',
  },
  captionContainer: {
    marginBottom: 6,
  },
  comments: {
    color: '#8e8e8e',
    marginBottom: 6,
  },
  timeAgo: {
    fontSize: 12,
    color: '#8e8e8e',
  },
});

export default Post;