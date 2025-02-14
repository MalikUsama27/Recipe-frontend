import React, { useState } from "react";
import { View, TextInput, StyleSheet, Animated, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomInput = ({ placeholder, isPassword, value, setValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(isPassword);
  const borderColor = new Animated.Value(0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColor, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#6200ea"],
  });

  return (
    <Animated.View style={[styles.container, { borderColor: animatedBorderColor }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={hidePassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={setValue}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon name={hidePassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: { flex: 1, height: 47, fontSize: 15 },
});

export default CustomInput;
