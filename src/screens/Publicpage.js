import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Modal } from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const Publicpage = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [mixedRecipe, setMixedRecipe] = useState(null);
  const [mixLoading, setMixLoading] = useState(false);

  useEffect(() => {
    const fetchPublicRecipes = async () => {
      try {
        const response = await axios.get("https://recipe-be-woad.vercel.app/api/recipes/public");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching public recipes:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicRecipes();
  }, []);

  // Function to fetch mixed recipe
  const fetchMixedRecipe = async () => {
    setMixLoading(true);
    try {
      const response = await axios.get("https://recipe-be-woad.vercel.app/api/recipes/mix");
      setMixedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching mixed recipe:", error.response?.data || error.message);
    } finally {
      setMixLoading(false);
    }
  };

  const openMixModal = () => {
    setModalVisible(true);
    fetchMixedRecipe();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Public Recipes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#51EB71" />
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeText}>Ingredients: {item.ingredients.join(", ")}</Text>
              <Text style={styles.recipeText}>Instructions: {item.instructions}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
<View style={styles.buttonContainer}>
      <CustomButton title="Mix Recipe" onPress={openMixModal} /></View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Generated Mixed Recipe</Text>
            {mixLoading ? (
              <ActivityIndicator size="large" color="#51EB71" />
            ) : mixedRecipe ? (
              <View>
                <Text style={styles.recipeTitle}>{mixedRecipe.title}</Text>
                <Text style={styles.recipeText}>Ingredients: {mixedRecipe.ingredients.join(", ")}</Text>
                <Text style={styles.recipeText}>Instructions: {mixedRecipe.instructions}</Text>
              </View>
            ) : (
              <Text style={styles.recipeText}>No data available</Text>
            )}
   <View style={styles.buttonContainer2}>
            <CustomButton  title="Close" onPress={() => setModalVisible(false)} /></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Publicpage;

const styles = StyleSheet.create({
  container: { padding: wp(5), flex: 1, backgroundColor: "#fff" },
  header: { fontSize: wp(6), fontWeight: "bold", textAlign: "center", marginBottom: hp(2) },
  recipeItem: {
    padding: wp(4),
    backgroundColor: "#f8f8f8",
    borderRadius: wp(2),
    marginBottom: hp(1.5),
  },
  recipeTitle: { fontSize: wp(4.5), fontWeight: "bold" },
  recipeText: { fontSize: wp(4), marginTop: hp(0.5) },
  buttonContainer: {
    alignItems: "center",
    marginVertical: hp("2%"),
    marginBottom:-hp('2%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: wp(80),
    padding: wp(5),
    backgroundColor: "#fff",
    borderRadius: wp(3),
    alignItems: "center",
  },
  modalTitle: { fontSize: wp(5), fontWeight: "bold", marginBottom: hp(2) },
});