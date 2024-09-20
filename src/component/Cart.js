import React from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {removeFromCart } from '../store/reducers/CartSlice';

const Cart = ({navigation}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text style={styles.cartText}>Quantity: {item.quantity}</Text>
      <Text style={styles.cartText}>Price: ${item.price}</Text>
      <Button title="Remove from Cart" onPress={() => handleRemoveFromCart(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  emptyCartContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  cartText: {
    fontSize: 16,
    paddingVertical: 4
  },
  emptyCartText: {
    fontSize:24,
    color:'#007bff'

  }
});

export default Cart;