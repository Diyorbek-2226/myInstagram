"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Animated,
  Alert,
} from "react-native"
import { Video } from "expo-av"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import * as Haptics from "expo-haptics"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

// Mock data for reels with video URLs
const REELS_DATA = [
  {
    id: "1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-waving-her-hair-in-a-pool-1229-large.mp4",
    user: {
      id: "user1",
      username: "travel_lover",
      profilePic: "https://randomuser.me/api/portraits/women/43.jpg",
      isVerified: true,
    },
    description: "Summer vibes 🌊 #summer #beach #vacation",
    likes: "423K",
    comments: "3.2K",
    music: "Summer Hits - Top Charts",
    isFollowing: false,
  },
  {
    id: "2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    user: {
      id: "user2",
      username: "nature_photography",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      isVerified: false,
    },
    description: "Nature is amazing! 🌿 #nature #photography #beautiful",
    likes: "98K",
    comments: "1.4K",
    music: "Peaceful Sounds - Relaxation",
    isFollowing: true,
  },
  {
    id: "3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-running-through-forest-32807-large.mp4",
    user: {
      id: "user3",
      username: "fitness_goals",
      profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
      isVerified: true,
    },
    description: "Morning run in the forest 🏃‍♀️ #fitness #running #motivation",
    likes: "156K",
    comments: "2.1K",
    music: "Workout Mix - Energy Boost",
    isFollowing: false,
  },
  {
    id: "4",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-the-stopwatch-running-32808-large.mp4",
    user: {
      id: "user4",
      username: "tech_reviews",
      profilePic: "https://randomuser.me/api/portraits/men/17.jpg",
      isVerified: false,
    },
    description: "New smartwatch review! ⌚ #tech #gadgets #review",
    likes: "75K",
    comments: "943",
    music: "Tech Beats - Electronic",
    isFollowing: true,
  },
]

const ReelItem = ({ item, index, currentIndex, onLike, navigation }) => {
  const videoRef = useRef(null)
  const [status, setStatus] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(item.likes || 0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Hide controls after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [showControls])

  // Play/pause video based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (index === currentIndex) {
        videoRef.current.playAsync()
      } else {
        videoRef.current.pauseAsync()
        videoRef.current.setPositionAsync(0)
      }
    }
  }, [currentIndex, index])

  const handleVideoPress = () => {
    setShowControls(!showControls)
    if (status.isPlaying) {
      videoRef.current.pauseAsync()
    } else {
      videoRef.current.playAsync()
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    onLike(item.id)
  }

  const handleComment = () => {
    navigation.navigate('Comments', { 
      postId: item.id,
      type: 'reel'
    })
  }

  const handleShare = () => {
    Alert.alert(
      'Ulashish',
      'Reelsni ulashish uchun platformani tanlang',
      [
        {
          text: 'Telegram',
          onPress: () => console.log('Telegram orqali ulashildi'),
        },
        {
          text: 'WhatsApp',
          onPress: () => console.log('WhatsApp orqali ulashildi'),
        },
        {
          text: 'Bekor qilish',
          style: 'cancel',
        },
      ]
    )
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const navigateToProfile = () => {
    navigation.navigate("UserProfile", { userId: item.user.id, username: item.user.username })
  }

  return (
    <View style={styles.reelContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={handleVideoPress}
      >
        <Video
          ref={videoRef}
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay={index === currentIndex}
          isMuted={isMuted}
          onPlaybackStatusUpdate={setStatus}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          useNativeControls={false}
        />

        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {showControls && (
          <View style={styles.controls}>
            <TouchableOpacity onPress={toggleMute}>
              <FontAwesome
                name={isMuted ? "volume-off" : "volume-up"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      {/* Top gradient for better visibility of header */}
      <LinearGradient colors={["rgba(0,0,0,0.7)", "transparent"]} style={styles.topGradient} />

      {/* Bottom gradient for better text visibility */}
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.bottomGradient} />

      {/* Header */}
      {showControls && (
        <View style={styles.header}>
          <Text style={styles.reelsText}>Reels</Text>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Right side controls */}
      <View style={styles.rightControls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleLike}>
          <FontAwesome
            name={isLiked ? "heart" : "heart-o"}
            size={30}
            color={isLiked ? "#ed4956" : "#fff"}
          />
          <Text style={styles.controlText}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleComment}>
          <FontAwesome name="comment-o" size={30} color="#fff" />
          <Text style={styles.controlText}>{item.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleShare}>
          <FontAwesome name="share" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <FontAwesome name="bookmark-o" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.audioButton}>
          <Image source={{ uri: item.user.profilePic }} style={styles.audioImage} />
        </TouchableOpacity>
      </View>

      {/* Bottom section with user info */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.userInfo} onPress={navigateToProfile}>
          <Image source={{ uri: item.user.profilePic }} style={styles.profilePic} />
          <Text style={styles.username}>{item.user.username}</Text>
          {item.user.isVerified && (
            <FontAwesome name="check-circle" size={14} color="#3897f0" style={styles.verifiedBadge} />
          )}
          {!item.isFollowing && (
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.musicSection}>
          <FontAwesome name="music" size={16} color="#fff" />
          <Text style={styles.musicText}>{item.music}</Text>
          <FontAwesome name="angle-right" size={16} color="#fff" style={styles.musicArrow} />
        </View>
      </View>

      {/* Audio control */}
      {showControls && (
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Progress bar */}
      {status.durationMillis && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(status.positionMillis / status.durationMillis) * 100}%`,
              },
            ]}
          />
        </View>
      )}
    </View>
  )
}

export default function ReelsScreen({ navigation }) {
  const insets = useSafeAreaInsets()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)
  const scrollY = useRef(new Animated.Value(0)).current

  // Pagination dots
  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {REELS_DATA.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.paginationDot, currentIndex === index && styles.activePaginationDot]}
            onPress={() => {
              flatListRef.current.scrollToIndex({ index, animated: true })
            }}
          />
        ))}
      </View>
    )
  }

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  const handleLike = (id) => {
    // In a real app, you would update the like count in your data
    console.log(`Liked reel with id: ${id}`)
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]} edges={["right", "left"]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Animated.FlatList
        ref={flatListRef}
        data={REELS_DATA}
        renderItem={({ item, index }) => (
          <ReelItem item={item} index={index} currentIndex={currentIndex} onLike={handleLike} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      />

      {/* Pagination dots on the right side */}
      {renderPaginationDots()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  reelContainer: {
    width: screenWidth,
    height: screenHeight,
    position: "relative",
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    zIndex: 10,
  },
  reelsText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cameraButton: {
    padding: 5,
  },
  rightControls: {
    position: "absolute",
    right: 10,
    bottom: 150,
    alignItems: "center",
  },
  controlButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  controlText: {
    color: "#fff",
    marginTop: 5,
    fontWeight: "600",
  },
  audioButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    marginTop: 10,
  },
  audioImage: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 60,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  username: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 5,
  },
  verifiedBadge: {
    marginRight: 10,
  },
  followButton: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 10,
  },
  followText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  description: {
    color: "#fff",
    marginBottom: 10,
  },
  musicSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  musicText: {
    color: "#fff",
    marginLeft: 5,
    flex: 1,
  },
  musicArrow: {
    marginLeft: 5,
  },
  muteButton: {
    position: "absolute",
    bottom: 100,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
  },
  paginationContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -50 }],
    alignItems: "center",
    zIndex: 20,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginVertical: 4,
  },
  activePaginationDot: {
    backgroundColor: "#fff",
    width: 6,
    height: 20,
    borderRadius: 3,
  },
})
