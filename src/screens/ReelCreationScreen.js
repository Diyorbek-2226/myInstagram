import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
    // Navigate to edit screen
    navigation.navigate('EditReel', { recordingTime });
  };
  
  const handleClose = () => {
    navigation.goBack();
  };
  
  const renderEffects = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.effectsContainer}
    >
      {EFFECTS.map((effect) => (
        <TouchableOpacity 
          key={effect.id}
          style={[
            styles.effectItem,
            selectedEffect === effect.id && styles.selectedEffect
          ]}
          onPress={() => setSelectedEffect(effect.id)}
        >
          <MaterialIcons name={effect.icon} size={24} color="#fff" />
          <Text style={styles.effectName}>{effect.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  
  const renderAudioSelector = () => (
    <View style={styles.audioSelectorContainer}>
      <TouchableOpacity 
        style={styles.audioButton}
        onPress={() => navigation.navigate('AudioSelector')}
      >
        <Ionicons name="musical-notes" size={24} color="#fff" />
        <Text style={styles.audioButtonText}>
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
    <SafeAreaView style={styles.container}>
      {/* Camera Preview (Placeholder) */}
      <View style={styles.cameraPreview}>
        <Text style={styles.cameraPlaceholderText}>Camera Preview</Text>
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="flash-outline" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Recording Timer */}
      {isRecording && (
        <View style={styles.timerContainer}>
          <View style={styles.timerDot} />
          <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
        </View>
      )}
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${(recordingTime / 30) * 100}%` }
          ]} 
        />
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        {/* Effects */}
        {renderEffects()}
        
        {/* Recording Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.galleryButton}>
            <Ionicons name="images" size={28} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.recordButton,
              isRecording && styles.recordingButton
            ]}
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording && <View style={styles.recordingInner} />}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.flipButton}>
            <Ionicons name="camera-reverse" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Audio Selector */}
        {renderAudioSelector()}
        
        {/* Speed Controls */}
        <View style={styles.speedContainer}>
          <TouchableOpacity style={styles.speedOption}>
            <Text style={styles.speedText}>0.3x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.speedOption}>
            <Text style={styles.speedText}>0.5x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.speedOption, styles.selectedSpeed]}>
            <Text style={[styles.speedText, styles.selectedSpeedText]}>1x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.speedOption}>
            <Text style={styles.speedText}>2x</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.speedOption}>
            <Text style={styles.speedText}>3x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  cameraPlaceholderText: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  timerContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f00',
    marginRight: 6,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  effectsContainer: {
    paddingBottom: 16,
  },
  effectItem: {
    alignItems: 'center',
    marginRight: 16,
    opacity: 0.7,
  },
  selectedEffect: {
    opacity: 1,
  },
  effectName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  galleryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    borderColor: '#f00',
  },
  recordingInner: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#f00',
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioSelectorContainer: {
    marginBottom: 16,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  speedOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  selectedSpeed: {
    backgroundColor: '#fff',
  },
  speedText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedSpeedText: {
    color: '#000',
  },
});

export default ReelCreationScreen;
