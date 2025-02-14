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
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import loginImage from "../../assets/login.png";
import { useNavigation } from "@react-navigation/native";
const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const slideAnim = useRef(new Animated.Value(hp("100%"))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation(); // Hook for navigation

  const handleAuth = () => {
    if (formData.email && formData.password) {
      navigation.navigate("Home"); // Navigate to Home Screen
    } else {
      alert("Please enter valid details.");
    }
  };

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
  }, [isLogin]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={loginImage} style={styles.image} />
        </View>

        <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
  <ScrollView 
    contentContainerStyle={styles.scrollContainer} 
    keyboardShouldPersistTaps="handled"
  >
    <Animated.View
      style={[
        styles.formContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

      {!isLogin && (
        <CustomInput
          placeholder="Name"
          value={formData.name}
          setValue={(val) => handleChange("name", val)}
        />
      )}
      <CustomInput
        placeholder="Email"
        value={formData.email}
        setValue={(val) => handleChange("email", val)}
      />
      <CustomInput
        placeholder="Password"
        isPassword
        value={formData.password}
        setValue={(val) => handleChange("password", val)}
      />

      <CustomButton
        title={isLogin ? "Login" : "Register"}
        onPress={handleAuth}
        // onPress={() =>
        //   alert(isLogin ? `Logged in as ${formData.email}` : `Registered as ${formData.email}`
            
        //   )
        // }
      />

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
    marginTop: 0,
  },
  image: {
    width: wp("135%"),
    height: hp("40%"),
    resizeMode: "contain",
    marginTop: -hp("3%"),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: hp("6%"),
    padding: wp("4%"),
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: wp("2%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: "black",
    textAlign: "center",
  },
  switchText: {
    marginTop: hp("1.5%"),
    color: "black",
    fontSize: wp("4%"),
  },
});

export default AuthScreen;
