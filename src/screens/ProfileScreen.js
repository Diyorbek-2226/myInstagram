import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// Temporary data for testing
const USER = {
  username: 'user1',
  name: 'User One',
  profilePic: 'https://picsum.photos/100',
  posts: 42,
  followers: 1234,
  following: 567,
  bio: 'This is my bio',
};

const POSTS = [
  {
    id: '1',
    image: 'https://picsum.photos/200',
  },
  {
    id: '2',
    image: 'https://picsum.photos/201',
  },
  {
    id: '3',
    image: 'https://picsum.photos/202',
  },
  // Add more posts here
];

export default function ProfileScreen() {
  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.post}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: USER.profilePic }} style={styles.profilePic} />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{USER.posts}</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{USER.followers}</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{USER.following}</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bio}>
        <Text style={styles.name}>{USER.name}</Text>
        <Text>{USER.bio}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <FlatList
        data={POSTS}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    padding: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  editButton: {
    margin: 15,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
  },
  post: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 1,
  },
  postImage: {
    flex: 1,
  },
}); 