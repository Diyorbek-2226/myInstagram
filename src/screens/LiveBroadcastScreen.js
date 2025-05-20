"use client"

import { useState } from "react"
import {
  View,
  Text,
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
    navigation.navigate("LiveBroadcast", { title, isPrivate })
  }

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3">
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">Live</Text>
          <TouchableOpacity
            onPress={handleStartLive}
            disabled={!title.trim()}
            className={!title.trim() ? "opacity-50" : ""}
          >
            <Text className="text-blue-500 text-base font-semibold">Start</Text>
          </TouchableOpacity>
        </View>

        {/* Camera Preview */}
        <View className="w-full h-64 relative">
          <View className="w-full h-full bg-gray-800 justify-center items-center">
            <Text className="text-white text-lg">Camera Preview</Text>
          </View>

          <View className="absolute top-4 left-4 right-4 flex-row justify-between">
            <View className="flex-row items-center bg-black/60 px-2 py-1 rounded">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-1" />
              <Text className="text-white text-xs font-semibold">LIVE</Text>
            </View>

            <View className="flex-row items-center bg-black/60 px-2 py-1 rounded">
              <Ionicons name="eye" size={16} color="#fff" />
              <Text className="text-white text-xs ml-1">0</Text>
            </View>
          </View>
        </View>

        {/* Title Input */}
        <View className="p-4 border-b border-gray-700">
          <TextInput
            className="text-white text-base py-2"
            placeholder="Add a title..."
            placeholderTextColor="#8e8e8e"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text className="text-gray-500 text-xs text-right mt-1">{title.length}/100</Text>
        </View>

        {/* Settings */}
        <View className="p-4 border-b border-gray-700">
          <View className="flex-row justify-between items-center py-3">
            <Text className="text-white text-base">Private</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>

          <View className="flex-row justify-between items-center py-3">
            <Text className="text-white text-base">Turn off commenting</Text>
            <Switch
              value={!commentsEnabled}
              onValueChange={(value) => setCommentsEnabled(!value)}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>

          <View className="flex-row justify-between items-center py-3">
            <Text className="text-white text-base">Request to go live</Text>
            <Switch
              value={requestsEnabled}
              onValueChange={setRequestsEnabled}
              trackColor={{ false: "#3a3a3a", true: "#0095f6" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Thumbnail Selection */}
        <View className="p-4 border-b border-gray-700">
          <Text className="text-white text-base font-semibold mb-3">Cover</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-2"
          >
            {thumbnails.map((thumbnail, index) => (
              <TouchableOpacity
                key={index}
                className={`mr-3 rounded overflow-hidden ${
                  selectedThumbnail === index ? "border-2 border-blue-500" : ""
                }`}
                onPress={() => setSelectedThumbnail(index)}
              >
                <Image source={{ uri: thumbnail }} className="w-20 h-20" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Practice Mode */}
        <TouchableOpacity className="flex-row items-center justify-center p-4">
          <MaterialIcons name="visibility-off" size={24} color="#0095f6" />
          <Text className="text-blue-500 text-base font-medium ml-2">Practice with friends</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LiveSetupScreen