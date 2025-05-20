import React from 'react';
import { ScrollView, View } from 'react-native';
import StoryItem from './StoryItem';

const StoriesList = ({ stories, navigation }) => {
  return (
    <View className="border-b border-gray-300 pb-2.5 pt-2.5">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {stories.map(story => (
          <StoryItem key={story.id} story={story} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesList;