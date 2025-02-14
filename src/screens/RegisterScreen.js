import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Register</Text>

      {/* Input Fields */}
      <CustomInput placeholder="Name" value={name} setValue={setName} />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" isPassword value={password} setValue={setPassword} />

      {/* Register Button */}
      <CustomButton title="Register" onPress={() => alert("Registered!")} />

      {/* Navigate Back to Login */}
      <CustomButton title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default RegisterScreen;
