import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const OrderPlaced = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.3, 
        duration: 1000, 
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.navigate('Products');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Text style={styles.text}>🎉 Order Placed! 🎉</Text>
        <View style={styles.circle}>
          <Text style={styles.checkmark}>✔️</Text> 
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animatedView: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
   // color: 'white', 
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 36,
  },
});

export default OrderPlaced;
