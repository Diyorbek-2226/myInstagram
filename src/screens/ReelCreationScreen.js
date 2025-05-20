import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AUDIO_TRACKS = [
  { id: 1, title: 'Popular Track 1', artist: 'Artist 1', duration: '0:30' },
  { id: 2, title: 'Trending Song', artist: 'Artist 2', duration: '0:45' },
  { id: 3, title: 'Viral Sound', artist: 'Creator', duration: '0:15' },
  { id: 4, title: 'Original Audio', artist: 'You', duration: '0:60' },
];

const EFFECTS = [
  { id: 1, name: 'Blur', icon: 'blur-on' },
  { id: 2, name: 'Green Screen', icon: 'filter-center-focus' },
  { id: 3, name: 'Slow-Mo', icon: 'slow-motion-video' },
  { id: 4, name: 'Timer', icon: 'timer' },
  { id: 5, name: 'Flash', icon: 'flash-on' },
];

const ReelCreationScreen = ({ navigation }) => {
  const [selectedEffect, setSelectedEffect] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const timerRef = useRef(null);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 30) {
          clearInterval(timerRef.current);
          setIsRecording(false);
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };
  
  const handleStopRecording = () => {
    clearInterval(timerRef.current);
    setIsRecording(false);
    navigation.navigate('EditReel', { recordingTime });
  };
  
  const handleClose = () => {
    navigation.goBack();
  };
  
  const renderEffects = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="pb-4"
    >
      {EFFECTS.map((effect) => (
        <TouchableOpacity 
          key={effect.id}
          className={`items-center mr-4 ${selectedEffect === effect.id ? 'opacity-100' : 'opacity-70'}`}
          onPress={() => setSelectedEffect(effect.id)}
        >
          <MaterialIcons name={effect.icon} size={24} color="#fff" />
          <Text className="text-white text-xs mt-1">{effect.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  
  const renderAudioSelector = () => (
    <View className="mb-4">
      <TouchableOpacity 
        className="flex-row items-center bg-white/20 px-4 py-2.5 rounded-full"
        onPress={() => navigation.navigate('AudioSelector')}
      >
        <Ionicons name="musical-notes" size={24} color="#fff" />
        <Text className="text-white text-sm flex-1 ml-2">
          {selectedAudio ? selectedAudio.title : 'Add Audio'}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Camera Preview (Placeholder) */}
      <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-gray-900">
        <Text className="text-white text-lg">Camera Preview</Text>
      </View>
      
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-4 z-10">
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View className="flex-row">
          <TouchableOpacity className="ml-4">
            <Ionicons name="flash-outline" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity className="ml-4">
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Recording Timer */}
      {isRecording && (
        <View className="absolute top-14 self-center flex-row items-center bg-black/50 px-3 py-1.5 rounded-full">
          <View className="w-2 h-2 rounded-full bg-red-500 mr-1.5" />
          <Text className="text-white text-sm font-medium">{formatTime(recordingTime)}</Text>
        </View>
      )}
      
      {/* Progress Bar */}
      <View className="absolute top-0 left-0 right-0 h-1 bg-white/30 z-10">
        <View 
          className="h-full bg-white" 
          style={{ width: `${(recordingTime / 30) * 100}%` }}
        />
      </View>
      
      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {/* Effects */}
        {renderEffects()}
        
        {/* Recording Controls */}
        <View className="flex-row justify-around items-center mb-4">
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 justify-center items-center">
            <Ionicons name="images" size={28} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`w-16 h-16 rounded-full justify-center items-center border-4 ${
              isRecording ? 'border-red-500' : 'border-white'
            }`}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording && <View className="w-7 h-7 rounded bg-red-500" />}
          </TouchableOpacity>
          
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 justify-center items-center">
            <Ionicons name="camera-reverse" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Audio Selector */}
        {renderAudioSelector()}
        
        {/* Speed Controls */}
        <View className="flex-row justify-around items-center">
          <TouchableOpacity className="px-3 py-1.5 rounded-full">
            <Text className="text-white text-sm">0.3x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-1.5 rounded-full">
            <Text className="text-white text-sm">0.5x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-1.5 rounded-full bg-white">
            <Text className="text-black text-sm">1x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-1.5 rounded-full">
            <Text className="text-white text-sm">2x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-1.5 rounded-full">
            <Text className="text-white text-sm">3x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReelCreationScreen;