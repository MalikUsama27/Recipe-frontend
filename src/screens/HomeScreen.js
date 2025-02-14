import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ navigation }) => {
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

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    const newRecipeObj = {
      id: Math.random().toString(),
      title: newRecipe.title,
      ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()), // Convert string to array
      instructions: newRecipe.instructions,
      isPublic: true,
    };
    setRecipes([...recipes, newRecipeObj]);
  };

  // Function to remove a recipe
  const removeRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Recipes</Text>

      {/* Button to navigate to Add Recipe screen */}
      <CustomButton
        title="Add New Recipe"
        onPress={() => navigation.navigate("AddRecipeScreen", { addRecipe })}
      />

      {/* Recipe List */}
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeText}>
              Ingredients: {item.ingredients.join(", ")}
            </Text>
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
  recipeItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeTitle: { fontSize: 18, fontWeight: "bold" },
  recipeText: { fontSize: 14, marginTop: 3 },
});

export default HomeScreen;
