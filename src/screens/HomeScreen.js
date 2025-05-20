import React from 'react';
import { View, FlatList } from 'react-native';
import StoriesList from '../components/StoriesList';
import Post from '../components/Post';
import { STORIES } from '../Data/data';
import { POSTS } from '../Data/data';

const HomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={POSTS}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<StoriesList stories={STORIES} navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;