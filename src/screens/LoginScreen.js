import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Animated
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomInput from "../components/CustomInput"; 
import CustomButton from "../components/CustomButton";
import login from "../../assets/login.png";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const slideAnim = useRef(new Animated.Value(50)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={login} style={styles.image} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Login</Text>

          <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            isPassword={false}
          />

          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            isPassword={true}
          />

          <CustomButton title="Login" onPress={() => alert("Logged in!")} />

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    // backgroundColor: "red",
    resizeMode: "contain",
    marginTop: -hp("3%"),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    color: "#6200ea",
    textAlign: "center",
  },
  registerText: {
    marginTop: hp("1.5%"),
    color: "#6200ea",
    fontSize: wp("4%"),
  },
});
