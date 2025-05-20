"use client"

import { useState } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const FILTERS = [
  { name: "Normal", filter: "none" },
  { name: "Clarendon", filter: "saturate(1.35) contrast(1.1)" },
  { name: "Gingham", filter: "sepia(0.15) contrast(1.1)" },
  { name: "Moon", filter: "grayscale(1)" },
  { name: "Lark", filter: "brightness(1.1) contrast(0.9)" },
  { name: "Reyes", filter: "sepia(0.4) contrast(0.75) brightness(1.1)" },
  { name: "Juno", filter: "saturate(1.4) contrast(0.9)" },
  { name: "Slumber", filter: "sepia(0.35) contrast(1.1) brightness(1.1)" },
  { name: "Crema", filter: "sepia(0.5) contrast(0.9)" },
  { name: "Ludwig", filter: "contrast(1.1) brightness(1.1)" },
]

const EditPostScreen = ({ route, navigation }) => {
  const { images, contentType } = route.params
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [caption, setCaption] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
    } else {
      navigation.navigate("Home", { posted: true })
    }
  }

  const handleBack = () => {
    if (currentStep === 0) {
      navigation.goBack()
    } else {
      setCurrentStep(0)
    }
  }

  const renderEditScreen = () => (
    <View className="flex-1">
      {/* Image Preview */}
      <View className="w-full aspect-square bg-gray-100">
        {images.length > 1 ? (
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} className="w-full h-full" resizeMode="contain" />
            )}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width)
              setCurrentImageIndex(index)
            }}
          />
        ) : (
          <Image source={{ uri: images[0] }} className="w-full h-full" resizeMode="contain" />
        )}

        {images.length > 1 && (
          <View className="absolute bottom-5 flex-row justify-center w-full">
            {images.map((_, index) => (
              <View
                key={index}
                className={`w-1.5 h-1.5 rounded-full mx-1 ${
                  currentImageIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </View>
        )}

        {/* Edit Tools */}
        <View className="absolute bottom-0 left-0 right-0 flex-row justify-around py-3 bg-black/50">
          <TouchableOpacity className="items-center">
            <MaterialIcons name="tune" size={24} color="#fff" />
            <Text className="text-white text-xs mt-1">Adjust</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <MaterialIcons name="brightness-6" size={24} color="#fff" />
            <Text className="text-white text-xs mt-1">Brightness</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <MaterialIcons name="contrast" size={24} color="#fff" />
            <Text className="text-white text-xs mt-1">Contrast</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <MaterialIcons name="crop" size={24} color="#fff" />
            <Text className="text-white text-xs mt-1">Crop</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-4 px-2"
      >
        {FILTERS.map((filter, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center mx-2 w-20 ${selectedFilter === index ? "border-b-2 border-blue-500" : ""}`}
            onPress={() => setSelectedFilter(index)}
          >
            <Image source={{ uri: images[currentImageIndex] }} className="w-16 h-16 rounded" />
            <Text className="text-gray-800 text-xs mt-1">{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  const renderCaptionScreen = () => (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-row p-4 border-b border-gray-200">
        <Image source={{ uri: images[0] }} className="w-15 h-15 rounded mr-3" />
        <TextInput
          className="flex-1 text-gray-800 text-base py-0"
          placeholder="Write a caption..."
          placeholderTextColor="#8e8e8e"
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
        <Text className="text-gray-800 text-base">Tag People</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
        <Text className="text-gray-800 text-base">Add Location</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-b border-gray-200">
        <Text className="text-gray-800 text-base">Add Music</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <View className="h-2 bg-gray-100" />

      <Text className="text-gray-800 text-base font-semibold px-4 py-3">Also post to</Text>

      <View className="px-4">
        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800 text-base">Facebook</Text>
          <TouchableOpacity>
            <Ionicons name="toggle" size={36} color="#0095f6" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800 text-base">Twitter</Text>
          <TouchableOpacity>
            <Ionicons name="toggle-outline" size={36} color="#8e8e8e" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-gray-800 text-base">Tumblr</Text>
          <TouchableOpacity>
            <Ionicons name="toggle-outline" size={36} color="#8e8e8e" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="flex-row justify-between items-center py-4 px-4 border-t border-gray-200">
        <Text className="text-gray-800 text-base">Advanced Settings</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>
    </ScrollView>
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#262626" />
        </TouchableOpacity>
        <Text className="text-gray-800 text-lg font-semibold">
          {currentStep === 0 ? "Edit" : "New post"}
        </Text>
        <TouchableOpacity onPress={handleNext}>
          <Text className="text-blue-500 text-base font-semibold">
            {currentStep === 0 ? "Next" : "Share"}
          </Text>
        </TouchableOpacity>
      </View>

      {currentStep === 0 ? renderEditScreen() : renderCaptionScreen()}
    </SafeAreaView>
  )
}

export default EditPostScreen