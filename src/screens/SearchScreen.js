import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Temporary data for testing
const POSTS = [
  {
    id: '1',
    image: 'https://picsum.photos/300',
  },
  {
    id: '2',
    image: 'https://picsum.photos/301',
  },
  {
    id: '3',
    image: 'https://picsum.photos/302',
  },
  {
    id: '4',
    image: 'https://picsum.photos/303',
  },
  // Add more posts here
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.post}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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