import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StoryItem from './StoryItem';

const StoriesList = ({ stories }) => {
  return (
    <View style={styles.storiesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
      >
        {stories.map(story => (
          <StoryItem key={story.id} story={story} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 10,
  },
  storiesList: {
    paddingHorizontal: 10,
  },
});

export default StoriesList;