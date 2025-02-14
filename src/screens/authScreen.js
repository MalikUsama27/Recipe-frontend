import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import loginImage from "../../assets/login.png";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(hp("100%"))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.replace("Home");
      }
    };
    checkAuthStatus();
  }, [navigation]);

  // Animate on first render
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAuth = async () => {
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      Alert.alert("Error", "Please enter all required fields.");
      return;
    }

    setLoading(true);
    const url = isLogin
      ? "https://recipe-be-woad.vercel.app/api/auth/login"
      : "https://recipe-be-woad.vercel.app/api/auth/register";

    try {
      const response = await axios.post(url, formData);
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        Alert.alert("Success", isLogin ? "Login successful!" : "Registration successful!");
        navigation.replace("Home");
      } else {
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={loginImage} style={styles.image} />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Animated.View
              style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
            >
              <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

              {!isLogin && (
                <CustomInput placeholder="Name" value={formData.name} setValue={(val) => handleChange("name", val)} />
              )}
              <CustomInput placeholder="Email" value={formData.email} setValue={(val) => handleChange("email", val)} />
              <CustomInput placeholder="Password" isPassword value={formData.password} setValue={(val) => handleChange("password", val)} />
              <CustomButton title={isLogin ? "Login" : "Register"} onPress={handleAuth} loading={loading} />
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: wp(135),
    height: hp(40),
    resizeMode: "contain",
    marginTop: -hp(6),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: hp(6),
    padding: wp(4),
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: wp(2),
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    marginBottom: hp(1),
    color: "black",
    textAlign: "center",
  },
  switchText: {
    marginTop: hp(1.5),
    color: "black",
    fontSize: wp(4),
  },
});

export default AuthScreen;
