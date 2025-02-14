import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      title: "Spaghetti",
      ingredients: ["Pasta", "Tomato Sauce", "Cheese"],
      instructions: "Boil pasta, add sauce, and sprinkle cheese.",
      isPublic: true,
    },
    {
      id: "2",
      title: "Tacos",
      ingredients: ["Tortillas", "Beef", "Lettuce", "Cheese"],
      instructions: "Fill tortillas with beef, lettuce, and cheese.",
      isPublic: true,
    },
  ]);

  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  // Add Recipe Function
  const addRecipe = () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      Alert.alert("All fields are required!");
      return;
    }

    const newRecipeObj = {
      id: Math.random().toString(),
      title: newRecipe.title,
      ingredients: newRecipe.ingredients.split(","), // Convert ingredients to array
      instructions: newRecipe.instructions,
      isPublic: true, // Default to public
    };

    setRecipes([...recipes, newRecipeObj]);
    setNewRecipe({ title: "", ingredients: "", instructions: "" });
  };

  // Remove Recipe Function
  const removeRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Recipes</Text>

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
        value={newRecipe.instructions}
        onChangeText={(text) => setNewRecipe({ ...newRecipe, instructions: text })}
      />

      {/* Add Recipe Button */}
      <CustomButton title="Add Recipe" onPress={addRecipe} />

      {/* Recipe List */}
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeText}>Ingredients: {item.ingredients.join(", ")}</Text>
            <Text style={styles.recipeText}>Instructions: {item.instructions}</Text>
            <CustomButton title="Remove" onPress={() => removeRecipe(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Navigate to Public Recipes */}
      <CustomButton title="Go to Public Recipes" onPress={() => alert("Navigating to public recipes...")} />
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  recipeItem: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginBottom: 10,
  },
  recipeTitle: { fontSize: 18, fontWeight: "bold" },
  recipeText: { fontSize: 14, marginTop: 3 },
});

export default HomeScreen;
