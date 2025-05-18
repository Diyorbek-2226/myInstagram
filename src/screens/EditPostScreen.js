"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
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
  const [currentStep, setCurrentStep] = useState(0) // 0: edit, 1: caption
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [caption, setCaption] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1)
    } else {
      // Handle post submission
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
    <View style={styles.editContainer}>
      {/* Image Preview */}
      <View style={styles.previewContainer}>
        {images.length > 1 ? (
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.previewImage} />}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width)
              setCurrentImageIndex(index)
            }}
          />
        ) : (
          <Image source={{ uri: images[0] }} style={styles.previewImage} />
        )}

        {images.length > 1 && (
          <View style={styles.paginationContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, currentImageIndex === index && styles.activePaginationDot]}
              />
            ))}
          </View>
        )}

        {/* Edit Tools */}
        <View style={styles.editToolsContainer}>
          <TouchableOpacity style={styles.editTool}>
            <MaterialIcons name="tune" size={24} color="#fff" />
            <Text style={styles.editToolText}>Adjust</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editTool}>
            <MaterialIcons name="brightness-6" size={24} color="#fff" />
            <Text style={styles.editToolText}>Brightness</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editTool}>
            <MaterialIcons name="contrast" size={24} color="#fff" />
            <Text style={styles.editToolText}>Contrast</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editTool}>
            <MaterialIcons name="crop" size={24} color="#fff" />
            <Text style={styles.editToolText}>Crop</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
        {FILTERS.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filterItem, selectedFilter === index && styles.selectedFilter]}
            onPress={() => setSelectedFilter(index)}
          >
            <Image source={{ uri: images[currentImageIndex] }} style={styles.filterThumbnail} />
            <Text style={styles.filterName}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  const renderCaptionScreen = () => (
    <ScrollView style={styles.captionContainer}>
      <View style={styles.captionHeader}>
        <Image source={{ uri: images[0] }} style={styles.captionThumbnail} />
        <TextInput
          style={styles.captionInput}
          placeholder="Write a caption..."
          placeholderTextColor="#8e8e8e"
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <TouchableOpacity style={styles.optionItem}>
        <Text style={styles.optionText}>Tag People</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem}>
        <Text style={styles.optionText}>Add Location</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionItem}>
        <Text style={styles.optionText}>Add Music</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Also post to</Text>

      <View style={styles.socialOptions}>
        <View style={styles.socialOption}>
          <Text style={styles.socialText}>Facebook</Text>
          <TouchableOpacity>
            <Ionicons name="toggle" size={36} color="#0095f6" />
          </TouchableOpacity>
        </View>

        <View style={styles.socialOption}>
          <Text style={styles.socialText}>Twitter</Text>
          <TouchableOpacity>
            <Ionicons name="toggle-outline" size={36} color="#8e8e8e" />
          </TouchableOpacity>
        </View>

        <View style={styles.socialOption}>
          <Text style={styles.socialText}>Tumblr</Text>
          <TouchableOpacity>
            <Ionicons name="toggle-outline" size={36} color="#8e8e8e" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.optionItem}>
        <Text style={styles.optionText}>Advanced Settings</Text>
        <Feather name="chevron-right" size={20} color="#8e8e8e" />
      </TouchableOpacity>
    </ScrollView>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentStep === 0 ? "Edit" : "New post"}</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextButton}>{currentStep === 0 ? "Next" : "Share"}</Text>
        </TouchableOpacity>
      </View>

      {currentStep === 0 ? renderEditScreen() : renderCaptionScreen()}
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
    borderBottomColor: "#262626",
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  nextButton: {
    color: "#0095f6",
    fontSize: 16,
    fontWeight: "600",
  },
  editContainer: {
    flex: 1,
  },
  previewContainer: {
    width: width,
    height: width,
    backgroundColor: "#1a1a1a",
  },
  previewImage: {
    width: width,
    height: width,
    resizeMode: "contain",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 3,
  },
  activePaginationDot: {
    backgroundColor: "#fff",
  },
  editToolsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  editTool: {
    alignItems: "center",
  },
  editToolText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  filtersContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  filterItem: {
    marginHorizontal: 8,
    alignItems: "center",
    width: 80,
  },
  selectedFilter: {
    borderBottomWidth: 2,
    borderBottomColor: "#0095f6",
  },
  filterThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  filterName: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  captionContainer: {
    flex: 1,
  },
  captionHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  captionThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  captionInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingTop: 0,
    textAlignVertical: "top",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    height: 8,
    backgroundColor: "#121212",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  socialOptions: {
    paddingHorizontal: 16,
  },
  socialOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
  },
})

export default EditPostScreen
