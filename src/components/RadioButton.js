import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RadioButton = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.radioCircle, selected && styles.selectedCircle]}
        onPress={() => onSelect(true)}
      >
        {selected && <View style={styles.selectedDot} />}
      </TouchableOpacity>
      <Text style={styles.text}>Public</Text>

      <TouchableOpacity
        style={[styles.radioCircle, !selected && styles.selectedCircle]}
        onPress={() => onSelect(false)}
      >
        {!selected && <View style={styles.selectedDot} />}
      </TouchableOpacity>
      <Text style={styles.text}>Private</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedCircle: {
    borderColor: "black",
    backgroundColor: "black",
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    marginRight: 20,
  },
});

export default RadioButton;
