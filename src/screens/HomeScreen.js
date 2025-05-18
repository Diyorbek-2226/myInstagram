import React from 'react';
import { View, FlatList } from 'react-native';
import StoriesList from '../components/StoriesList';
import Post from '../components/Post';
import { STORIES } from '../Data/data';
import { POSTS } from '../Data/data';
// Mock data


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={POSTS}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<StoriesList stories={STORIES} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default HomeScreen;