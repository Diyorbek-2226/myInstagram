import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  
  const scaleValue = new Animated.Value(1);
  const buttonOpacity = new Animated.Value(1);

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
      // TODO: Implement login logic
      navigation.navigate('Main');
    });
  };

  const isLoginEnabled = email.length > 0 && password.length > 0;

  const animateButton = (toValue) => {
    Animated.timing(buttonOpacity, {
      toValue,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Instagram</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={[
          styles.inputWrapper,
          emailFocus && styles.inputWrapperFocused,
          email.length > 0 && styles.inputWrapperFilled
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Phone number, email or username"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={[
          styles.inputWrapper,
          passwordFocus && styles.inputWrapperFocused,
          password.length > 0 && styles.inputWrapperFilled
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            secureTextEntry={!showPassword}
          />
          {password.length > 0 && (
            <Pressable 
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={10}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          )}
        </View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            { 
              transform: [{ scale: scaleValue }],
              opacity: buttonOpacity 
            }
          ]}
        >
          <TouchableOpacity 
            style={[styles.button, !isLoginEnabled && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isLoginEnabled}
            activeOpacity={0.7}
            onPressIn={() => animateButton(0.7)}
            onPressOut={() => animateButton(1)}
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity 
          style={styles.forgotButton}
          activeOpacity={0.6}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
          style={styles.facebookButton}
          activeOpacity={0.7}
        >
          <Text style={styles.facebookButtonText}>
            <Text style={styles.facebookIcon}>f</Text> Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    fontSize: 40,
    fontFamily: Platform.select({ ios: 'Noteworthy', android: 'sans-serif-light' }),
    fontWeight: '600',
    color: '#262626',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  inputWrapperFocused: {
    borderColor: '#262626',
  },
  inputWrapperFilled: {
    borderColor: '#dbdbdb',
  },
  input: {
    fontSize: 16,
    color: '#262626',
    padding: 0,
    margin: 0,
    height: '100%',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 12,
    top: 15,
  },
  showPasswordText: {
    color: '#262626',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0095f6',
    height: 44,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#b2dffc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotText: {
    color: '#00376b',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    marginTop: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  dividerText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  facebookButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  facebookButtonText: {
    color: '#385185',
    fontSize: 14,
    fontWeight: '600',
  },
  facebookIcon: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  signupText: {
    fontSize: 14,
    color: '#262626',
  },
  signupLink: {
    fontSize: 14,
    color: '#0095f6',
    fontWeight: '600',
  },
});