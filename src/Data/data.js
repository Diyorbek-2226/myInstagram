export const USER_STORIES = {
  'your-story': [
    {
      id: 'your-story-1',
      username: 'Your Story',
      image: 'https://picsum.photos/200',
      isYourStory: true,
      type: 'image',
      duration: 5000,
    },
  ],
  'travel_lover': [
    {
      id: 'travel_story_1',
      username: 'travel_lover',
      image: 'https://picsum.photos/201',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
    {
      id: 'travel_story_2',
      username: 'travel_lover',
      image: 'https://picsum.photos/211',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
  'foodie_adventures': [
    {
      id: 'foodie_story_1',
      username: 'foodie_adventures',
      image: 'https://picsum.photos/202',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
   'fitness_guru': [
    {
      id: 'fitness_story_1',
      username: 'fitness_guru',
      image: 'https://picsum.photos/203',
      hasStory: true,
      viewed: true,
      type: 'image',
      duration: 5000,
    },
  ],
  'tech_geek': [
    {
      id: 'tech_story_1',
      username: 'tech_geek',
      image: 'https://picsum.photos/204',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
   'art_enthusiast': [
    {
      id: 'art_story_1',
      username: 'art_enthusiast',
      image: 'https://picsum.photos/205',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
  'music_producer': [
    {
      id: 'music_story_1',
      username: 'music_producer',
      image: 'https://picsum.photos/206',
      hasStory: true,
      viewed: true,
      type: 'image',
      duration: 5000,
    },
  ],
  'fashion_icon': [
    {
      id: 'fashion_story_1',
      username: 'fashion_icon',
      image: 'https://picsum.photos/207',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
  'book_worm': [
    {
      id: 'book_story_1',
      username: 'book_worm',
      image: 'https://picsum.photos/208',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
   'pet_lover': [
    {
      id: 'pet_story_1',
      username: 'pet_lover',
      image: 'https://picsum.photos/209',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
  'nature_photographer': [
    {
      id: 'nature_story_1',
      username: 'nature_photographer',
      image: 'https://picsum.photos/210',
      hasStory: true,
      viewed: false,
      type: 'image',
      duration: 5000,
    },
  ],
};

export const STORIES = Object.entries(USER_STORIES).map(([userId, stories]) => ({
  id: userId,
  username: stories[0].username,
  image: stories[0].image,
  hasStory: true,
  viewed: stories[0].viewed || false,
  isYourStory: userId === 'your-story',
  user: {
    username: stories[0].username,
    id: userId
  }
}));

export const POSTS = [
  {
    id: '1',
    user: {
      username: 'travel_lover',
      profilePic: 'https://picsum.photos/50',
    },
    image: 'https://picsum.photos/400',
    likes: 1243,
    caption: 'Exploring the hidden gems of Bali! 🌴 #travel #adventure',
    comments: 87,
    timeAgo: '2 hours ago',
  },
  {
    id: '2',
    user: {
      username: 'foodie_adventures',
      profilePic: 'https://picsum.photos/51',
    },
    image: 'https://picsum.photos/401',
    likes: 892,
    caption: 'Homemade pasta with truffle oil - worth every calorie! 🍝 #foodie #homecooking',
    comments: 42,
    timeAgo: '4 hours ago',
  },
  {
    id: '3',
    user: {
      username: 'fitness_guru',
      profilePic: 'https://picsum.photos/52',
    },
    image: 'https://picsum.photos/402',
    likes: 2456,
    caption: 'Morning workout complete! Who else loves sunrise sessions? ☀️ #fitness #motivation',
    comments: 132,
    timeAgo: '6 hours ago',
  },
  {
    id: '4',
    user: {
      username: 'tech_geek',
      profilePic: 'https://picsum.photos/53',
    },
    image: 'https://picsum.photos/403',
    likes: 567,
    caption: 'Just got the new smartphone! The camera is insane 📱 #tech #gadgets',
    comments: 29,
    timeAgo: '8 hours ago',
  },
  {
    id: '5',
    user: {
      username: 'art_enthusiast',
      profilePic: 'https://picsum.photos/54',
    },
    image: 'https://picsum.photos/404',
    likes: 1789,
    caption: 'My latest painting - acrylic on canvas. What do you think? 🎨 #art #creative',
    comments: 94,
    timeAgo: '10 hours ago',
  },
  {
    id: '6',
    user: {
      username: 'music_producer',
      profilePic: 'https://picsum.photos/55',
    },
    image: 'https://picsum.photos/405',
    likes: 3210,
    caption: 'New track dropping next week! Here\'s a little teaser 🎧 #music #producerlife',
    comments: 215,
    timeAgo: '12 hours ago',
  },
  {
    id: '7',
    user: {
      username: 'fashion_icon',
      profilePic: 'https://picsum.photos/56',
    },
    image: 'https://picsum.photos/406',
    likes: 4321,
    caption: 'Summer vibes with this new outfit! 👗 #fashion #style',
    comments: 187,
    timeAgo: '1 day ago',
  },
  {
    id: '8',
    user: {
      username: 'book_worm',
      profilePic: 'https://picsum.photos/57',
    },
    image: 'https://picsum.photos/407',
    likes: 765,
    caption: 'Just finished this amazing novel. Highly recommend! 📚 #reading #bookstagram',
    comments: 53,
    timeAgo: '1 day ago',
  },
  {
    id: '9',
    user: {
      username: 'pet_lover',
      profilePic: 'https://picsum.photos/58',
    },
    image: 'https://picsum.photos/408',
    likes: 2987,
    caption: 'My babies being adorable as always! 🐶🐱 #pets #dogsofinstagram',
    comments: 176,
    timeAgo: '2 days ago',
  },
  {
    id: '10',
    user: {
      username: 'nature_photographer',
      profilePic: 'https://picsum.photos/59',
    },
    image: 'https://picsum.photos/409',
    likes: 5123,
    caption: 'Sunrise at the mountains. Nature never fails to amaze me. 🌄 #nature #photography',
    comments: 298,
    timeAgo: '2 days ago',
  },
  {
    id: '11',
    user: {
      username: 'travel_lover',
      profilePic: 'https://picsum.photos/50',
    },
    image: 'https://picsum.photos/410',
    likes: 1876,
    caption: 'Beach day in Thailand! The water is crystal clear 🏖️ #travel #beach',
    comments: 102,
    timeAgo: '3 days ago',
  },
  {
    id: '12',
    user: {
      username: 'foodie_adventures',
      profilePic: 'https://picsum.photos/51',
    },
    image: 'https://picsum.photos/411',
    likes: 943,
    caption: 'Sunday brunch with friends! The pancakes were incredible 🥞 #brunch #food',
    comments: 67,
    timeAgo: '3 days ago',
  },
];