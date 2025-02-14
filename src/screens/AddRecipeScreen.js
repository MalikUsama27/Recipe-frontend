import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const AddRecipeScreen = ({ navigation, route }) => {
  const { addRecipe } = route.params;
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  // Function to handle adding the recipe
  const handleAddRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      Alert.alert("All fields are required!");
      return;
    }

    addRecipe(newRecipe);
    setNewRecipe({ title: "", ingredients: "", instructions: "" });
    navigation.goBack(); // Navigate back to HomeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Recipe</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Recipe Title"
        value={newRecipe.title}
        onChangeText={(text) => setNewRecipe({ ...newRecipe, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma separated)"
        value={newRecipe.ingredients}
        onChangeText={(text) => setNewRecipe({ ...newRecipe, ingredients: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        multiline
        value={newRecipe.instructions}
        onChangeText={(text) => setNewRecipe({ ...newRecipe, instructions: text })}
      />

      {/* Button to Add Recipe */}
      <CustomButton title="Add Recipe" onPress={handleAddRecipe} />

      {/* Button to Cancel and Go Back */}
      <CustomButton title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f2f2f2",
  },
});

export default AddRecipeScreen;
