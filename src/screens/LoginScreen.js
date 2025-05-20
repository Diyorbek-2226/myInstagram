import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
  Easing
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  
  const scaleValue = useRef(new Animated.Value(1)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const formYPosition = useRef(new Animated.Value(20)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start(() => {
      navigation.navigate('Main');
    });
  };

  const animateForm = (toValue) => {
    Animated.timing(formYPosition, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start();
  };

  const animateLogo = () => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
  };

  const isLoginEnabled = email.length > 0 && password.length > 0;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white px-5"
    >
      <Animated.View 
        className="items-center mt-16 mb-10"
        style={{ transform: [{ scale: logoScale }] }}
      >
        <Text 
          className="text-4xl font-semibold text-gray-800"
          style={{ fontFamily: Platform.select({ ios: 'Noteworthy', android: 'sans-serif-light' }) }}
          onPress={animateLogo}
        >
          Instagram
        </Text>
      </Animated.View>

      <Animated.View 
        className="mb-5"
        style={{ transform: [{ translateY: formYPosition }] }}
      >
        <View className={`
          h-12 border rounded-md mb-3 justify-center px-3
          ${emailFocus ? 'border-gray-800' : 'border-gray-200'}
          ${email.length > 0 ? 'bg-white' : 'bg-gray-50'}
        `}>
          <TextInput
            className="text-base text-gray-800 h-full p-0 m-0"
            placeholder="Phone number, email or username"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            onFocus={() => {
              setEmailFocus(true);
              animateForm(0);
            }}
            onBlur={() => {
              setEmailFocus(false);
              animateForm(20);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className={`
          h-12 border rounded-md mb-3 justify-center px-3
          ${passwordFocus ? 'border-gray-800' : 'border-gray-200'}
          ${password.length > 0 ? 'bg-white' : 'bg-gray-50'}
        `}>
          <TextInput
            className="text-base text-gray-800 h-full p-0 m-0 pr-10"
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            onFocus={() => {
              setPasswordFocus(true);
              animateForm(0);
            }}
            onBlur={() => {
              setPasswordFocus(false);
              animateForm(20);
            }}
            secureTextEntry={!showPassword}
          />
          {password.length > 0 && (
            <Pressable 
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={10}
            >
              <Text className="text-gray-800 font-semibold text-sm">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          )}
        </View>

        <Animated.View 
          className="mt-2"
          style={{ 
            transform: [{ scale: scaleValue }],
            opacity: buttonOpacity 
          }}
        >
          <TouchableOpacity 
            className={`
              h-11 rounded-md items-center justify-center
              ${isLoginEnabled ? 'bg-blue-500' : 'bg-blue-300'}
            `}
            onPress={handleLogin}
            disabled={!isLoginEnabled}
            activeOpacity={0.7}
            onPressIn={() => {
              Animated.timing(buttonOpacity, {
                toValue: 0.7,
                duration: 100,
                useNativeDriver: true
              }).start();
            }}
            onPressOut={() => {
              Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
              }).start();
            }}
          >
            <Text className="text-white text-sm font-semibold">Log in</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          className="items-center mt-5"
          activeOpacity={0.6}
        >
          <Text className="text-blue-800 text-xs font-medium">Forgot password?</Text>
        </TouchableOpacity>
      </Animated.View>

      <View className="mt-5">
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="text-gray-600 text-xs font-semibold mx-4">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <TouchableOpacity 
          className="items-center mb-6"
          activeOpacity={0.7}
        >
          <Text className="text-blue-900 text-sm font-semibold">
            <Text className="font-bold">f</Text> Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center border-t border-gray-300 absolute bottom-0 left-0 right-0 py-5 bg-white">
        <Text className="text-gray-800 text-sm">Don't have an account? </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-blue-500 text-sm font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}