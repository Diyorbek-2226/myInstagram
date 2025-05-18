"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Switch,
  ScrollView,
  Image,
} from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

const LiveSetupScreen = ({ navigation }) => {
  const [title, setTitle] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [commentsEnabled, setCommentsEnabled] = useState(true)
  const [requestsEnabled, setRequestsEnabled] = useState(true)
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)

  const thumbnails = [
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
  ]

  const handleStartLive = () => {
    // Navigate to live broadcast screen
    navigation.navigate("LiveBroadcast", { title, isPrivate })
  }

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live</Text>
          <TouchableOpacity
            onPress={handleStartLive}
            disabled={!title.trim()}
            style={!title.trim() && styles.disabledButton}
          >
            <Text style={styles.startButton}>Start</Text>
          </TouchableOpacity>
        </View>

        {/* Camera Preview */}
        <View style={styles.previewContainer}>
          <View style={styles.cameraPreview}>
            <Text style={styles.previewText}>Camera Preview</Text>
          </View>

          <View style={styles.previewOverlay}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveIndicatorDot} />
              <Text style={styles.liveIndicatorText}>LIVE</Text>
            </View>

            <View style={styles.viewersIndicator}>
              <Ionicons name="eye" size={16} color="#fff" />
              <Text style={styles.viewersText}>0</Text>
            </View>
          </View>
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Add a title..."
            placeholderTextColor="#8e8e8e"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Private</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Turn off commenting</Text>
            <Switch
              value={!commentsEnabled}
              onValueChange={(value) => setCommentsEnabled(!value)}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Request to go live</Text>
            <Switch
              value={requestsEnabled}
              onValueChange={setRequestsEnabled}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Thumbnail Selection */}
        <View style={styles.thumbnailSection}>
          <Text style={styles.sectionTitle}>Cover</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {thumbnails.map((thumbnail, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.thumbnailItem, selectedThumbnail === index && styles.selectedThumbnail]}
                onPress={() => setSelectedThumbnail(index)}
              >
                <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Practice Mode */}
        <TouchableOpacity style={styles.practiceButton}>
          <MaterialIcons name="visibility-off" size={24} color="#0095f6" />
          <Text style={styles.practiceButtonText}>Practice with friends</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  startButton: {
    color: "#0095f6",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  previewContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  cameraPreview: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    color: "#fff",
    fontSize: 18,
  },
  previewOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f00",
    marginRight: 4,
  },
  liveIndicatorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  viewersIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewersText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  inputContainer: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  titleInput: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
  },
  charCount: {
    color: "#8e8e8e",
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  settingsContainer: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLabel: {
    color: "#fff",
    fontSize: 16,
  },
  thumbnailSection: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  thumbnailContainer: {
    paddingVertical: 8,
  },
  thumbnailItem: {
    marginRight: 12,
    borderRadius: 4,
    overflow: "hidden",
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "#0095f6",
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  practiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  practiceButtonText: {
    color: "#0095f6",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
})

export default LiveSetupScreen
