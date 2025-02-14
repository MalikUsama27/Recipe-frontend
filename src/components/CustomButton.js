import React from "react";
import { TouchableOpacity, Text, Animated, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  button: {
    backgroundColor: "black",
    width: 300,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  text: { color: "white", fontSize: 17, fontWeight: "bold" },
});

export default CustomButton;
