"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native"
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"

const { width } = Dimensions.get("window")
const THUMBNAIL_SIZE = width / 3 - 2

// Mock user data
const USERS = {
  user1: {
    id: "user1",
    username: "travel_lover",
    fullName: "Travel Enthusiast",
    profilePic: "https://randomuser.me/api/portraits/women/43.jpg",
    bio: "Travel blogger | Adventure seeker | 30+ countries visited ✈️ 🌎",
    postsCount: 245,
    followers: "423K",
    following: 512,
    isVerified: true,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/10/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/11/300/300", isVideo: true },
      { id: "p3", image: "https://picsum.photos/id/12/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/13/300/300", isVideo: false },
      { id: "p5", image: "https://picsum.photos/id/14/300/300", isVideo: true },
      { id: "p6", image: "https://picsum.photos/id/15/300/300", isVideo: false },
    ],
  },
  user2: {
    id: "user2",
    username: "nature_photography",
    fullName: "Nature Photography",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Capturing the beauty of nature 📸 | Professional photographer",
    postsCount: 178,
    followers: "98K",
    following: 324,
    isVerified: false,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/16/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/17/300/300", isVideo: false },
      { id: "p3", image: "https://picsum.photos/id/18/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/19/300/300", isVideo: true },
      { id: "p5", image: "https://picsum.photos/id/20/300/300", isVideo: false },
      { id: "p6", image: "https://picsum.photos/id/21/300/300", isVideo: false },
    ],
  },
  user3: {
    id: "user3",
    username: "fitness_goals",
    fullName: "Fitness Goals",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Fitness coach | Healthy lifestyle advocate | Join my workout program 💪",
    postsCount: 312,
    followers: "156K",
    following: 287,
    isVerified: true,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/22/300/300", isVideo: true },
      { id: "p2", image: "https://picsum.photos/id/23/300/300", isVideo: false },
      { id: "p3", image: "https://picsum.photos/id/24/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/25/300/300", isVideo: true },
      { id: "p5", image: "https://picsum.photos/id/26/300/300", isVideo: false },
      { id: "p6", image: "https://picsum.photos/id/27/300/300", isVideo: false },
    ],
  },
  user4: {
    id: "user4",
    username: "tech_reviews",
    fullName: "Tech Reviews",
    profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
    bio: "Tech enthusiast | Gadget reviews | Latest tech news 📱 💻",
    postsCount: 156,
    followers: "75K",
    following: 412,
    isVerified: false,
    posts: [
      { id: "p1", image: "https://picsum.photos/id/28/300/300", isVideo: false },
      { id: "p2", image: "https://picsum.photos/id/29/300/300", isVideo: true },
      { id: "p3", image: "https://picsum.photos/id/30/300/300", isVideo: false },
      { id: "p4", image: "https://picsum.photos/id/31/300/300", isVideo: false },
      { id: "p5", image: "https://picsum.photos/id/32/300/300", isVideo: true },
      { id: "p6", image: "https://picsum.photos/id/33/300/300", isVideo: false },
    ],
  },
}

const UserProfileScreen = ({ route, navigation }) => {
  const { userId, username } = route.params
  const [activeTab, setActiveTab] = useState("grid")

  // Get user data based on userId
  const userData = USERS[userId] || {
    username: username || "user",
    fullName: "Instagram User",
    profilePic: "https://randomuser.me/api/portraits/lego/1.jpg",
    bio: "No bio yet",
    postsCount: 0,
    followers: "0",
    following: 0,
    isVerified: false,
    posts: [],
  }

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postThumbnail}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      {item.isVideo && (
        <View style={styles.videoIndicator}>
          <Ionicons name="play" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userData.username}</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.postsCount}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bioSection}>
          <View style={styles.nameContainer}>
            <Text style={styles.fullName}>{userData.fullName}</Text>
            {userData.isVerified && (
              <MaterialCommunityIcons name="check-circle" size={14} color="#3897f0" style={styles.verifiedBadge} />
            )}
          </View>
          <Text style={styles.bio}>{userData.bio}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "grid" && styles.activeTab]}
            onPress={() => setActiveTab("grid")}
          >
            <Ionicons name="grid-outline" size={24} color={activeTab === "grid" ? "#fff" : "#8e8e8e"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "reels" && styles.activeTab]}
            onPress={() => setActiveTab("reels")}
          >
            <MaterialCommunityIcons
              name="play-box-outline"
              size={24}
              color={activeTab === "reels" ? "#fff" : "#8e8e8e"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "tagged" && styles.activeTab]}
            onPress={() => setActiveTab("tagged")}
          >
            <Ionicons name="person-outline" size={24} color={activeTab === "tagged" ? "#fff" : "#8e8e8e"} />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        {userData.posts.length > 0 ? (
          <FlatList
            data={userData.posts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noPostsContainer}>
            <Ionicons name="camera-outline" size={60} color="#8e8e8e" />
            <Text style={styles.noPostsText}>No Posts Yet</Text>
          </View>
        )}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  profileInfo: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#fff",
    fontSize: 14,
  },
  bioSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  fullName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  verifiedBadge: {
    marginLeft: 5,
  },
  bio: {
    color: "#fff",
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  followButton: {
    flex: 1,
    backgroundColor: "#3897f0",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    marginRight: 5,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#262626",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    marginRight: 5,
  },
  messageButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  moreButton: {
    backgroundColor: "#262626",
    width: 40,
    height: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#262626",
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  postThumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    margin: 1,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  videoIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  noPostsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  noPostsText: {
    color: "#8e8e8e",
    fontSize: 16,
    marginTop: 10,
  },
})


export default UserProfileScreen
