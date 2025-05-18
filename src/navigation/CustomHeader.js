import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomHeader = ({ route }) => {
  let title = '';
  let showIcons = false;

  switch (route.name) {
    case 'Home':
      title = 'Instagram';
      showIcons = true;
      break;
    case 'Search':
      title = 'Search';
      break;
    case 'Profile':
      title = 'Profile';
      break;
    case 'Reels':
      title = 'Reels';
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        {showIcons && (
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="heart-outline" size={24} color="#262626" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, styles.messengerButton]}>
              <MaterialCommunityIcons name="facebook-messenger" size={24} color="#262626" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 15,
    marginTop: Platform.OS === 'android' ? 5 : 5
  },
  title: {
    fontSize: 22,
    color: '#262626',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 10
  },
  messengerButton: {
    marginLeft: 5
  }
};

export default CustomHeader;