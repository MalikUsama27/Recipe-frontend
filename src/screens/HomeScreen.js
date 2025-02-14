import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Alert, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import RadioButton from "../components/RadioButton"; 

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: "", ingredients: "", instructions: "", isPublic: true });
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
        fetchRecipes(storedToken);
      }
    };
    getToken();
  }, []);

  const fetchRecipes = async (authToken) => {
    setLoading(true);
    try {
      const response = await axios.get("https://recipe-be-woad.vercel.app/api/recipes/user", {
        headers: { Authorization: `Bearer ${authToken || token}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.instructions) {
      setError("All fields are required!");
      return;
    }

    const newRecipeObj = {
      title: newRecipe.title,
      ingredients: newRecipe.ingredients.split(","),
      instructions: newRecipe.instructions,
      isPublic: newRecipe.isPublic,
    };

    try {
      await axios.post("https://recipe-be-woad.vercel.app/api/recipes/add", newRecipeObj, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewRecipe({ title: "", ingredients: "", instructions: "", isPublic: true });
      setError(""); 
      fetchRecipes();
    } catch (error) {
      console.error("Error adding recipe:", error.response?.data || error.message);
    }
  };

  const removeRecipe = async (id) => {
    try {
      await axios.delete(`https://recipe-be-woad.vercel.app/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRecipes();
    } catch (error) {
      console.error("Error removing recipe:", error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Recipes</Text>

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

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.radioContainer}>
        <RadioButton
          selected={newRecipe.isPublic}
          onSelect={(value) => setNewRecipe({ ...newRecipe, isPublic: value })}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton title="Add Recipe" onPress={addRecipe} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#51EB71" style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeText}>Ingredients: {item.ingredients.join(", ")}</Text>
              <Text style={styles.recipeText}>Instructions: {item.instructions}</Text>
              <View style={styles.btnremove} >
              <CustomButton title="Remove" onPress={() => removeRecipe(item._id)} /></View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
      <View style={styles.buttonContainer2}>
        <CustomButton title="Public Page" onPress={() => navigation.navigate("PublicPage")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: wp("5%"), flex: 1, backgroundColor: "#fff" },
  header: { fontSize: wp("6%"), fontWeight: "bold", textAlign: "center", marginBottom: hp("2%") },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: wp("3%"),
    marginBottom: hp("1.5%"),
    borderRadius: wp("2%"),
    fontSize: wp("4%"),
    backgroundColor: "#f9f9f9",
  },
  radioContainer: {
    marginBottom: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp("2%"),
    marginTop:-hp('1%')
  },
  buttonContainer2: {
    alignItems: "center",
    marginVertical: hp("2%"),
    marginBottom:-hp('2%'),
  },
  btnremove:{
    alignItems: "center",
    marginVertical: hp("2%"),
    marginBottom:-hp('1%'),
  },
  recipeItem: {
    padding: wp("3%"),
    backgroundColor: "#f8f8f8",
    borderRadius: wp("2%"),
    marginBottom: hp("1.5%"),
    elevation: 3, 
  },
  recipeTitle: { fontSize: wp("5%"), fontWeight: "bold", marginBottom: hp("1%") },
  recipeText: { fontSize: wp("3.5%"), marginBottom: hp("1%") },
  activityIndicator: {
    alignSelf: "center",
    marginVertical: hp("2%"),
  },
  errorText: {
    color: "red",
    fontSize: wp("4%"),
    textAlign: "center",
    marginBottom: hp("1%"),
  },
});

export default HomeScreen;
