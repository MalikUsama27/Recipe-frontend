import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Easing, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import foodpic from "../../assets/Ellipse10.png"; 
import bgpic from "../../assets/image8.png"; 

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('auth');
      }, 3000);
    });
  }, [navigation]);

  return (
    <ImageBackground source={bgpic} style={styles.background}>
      <View style={styles.overlay}>
        <Animated.Image
          source={foodpic}
          style={[styles.centerImage, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}
        />
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Find Recipes</Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerImage: {
    width: wp(50),
    height: wp(50),
    resizeMode: 'contain',
  },
  text: {
    fontSize: wp(7), 
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: hp(2),
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default SplashScreen;
