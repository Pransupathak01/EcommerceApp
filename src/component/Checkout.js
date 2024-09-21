import React, { useState } from 'react';
import { View, Text, Button,TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { clearCart } from '../store/reducers/CartSlice';
const Checkout = ({ navigation }) => {
    const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const handlePlaceOrder = () => {
    Alert.alert(
      'Place Order',
      'Are you sure you want to place this order?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Order Cancelled'),
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            navigation.navigate("OrderPlaced")
            console.log('Order Placed');
          },
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment method</Text>
      <Text style={styles.subtitle}>Cash on Delivery (COD)</Text>

      {cartItems.map(item => (
        <View key={item.id} style={styles.cartItem}>
          <Text style={styles.itemText}>{item.title} - ${item.price}</Text>
          <Text style={styles.itemText}>quantity - {item.quantity}</Text>
        </View>
      ))}
      <Text style={styles.totalItemText}>Total ${totalPrice}</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{handlePlaceOrder()}}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  totalItemText: {
    padding:10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    width: '100%',
   
  },
  buttonContainer: {
    alignItems: 'center', 
    marginVertical: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
 
});

export default Checkout;
