import React from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, Image, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import { useSelector, useDispatch } from 'react-redux';
import {removeFromCart } from '../store/reducers/CartSlice';

const Cart = ({navigation}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    Toast.show('😮 Item removed from cart!', {
      duration: Toast.durations.SHORT, 
      position: 85, 
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#ffffff', 
      textColor: '#000000',      
    }); 
  };
  const renderItem = ({ item }) => (
    <View style={styles.cartConatiner}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <View style={styles.cartInfoContainer}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text style={styles.cartText}>Quantity: {item.quantity}</Text>
      <Text style={styles.cartText}>Price: ${item.price}</Text>
      <Button title="Remove from Cart" onPress={() => handleRemoveFromCart(item)} />
      </View>
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
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Checkout")}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
          </View>
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
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
  },
  cartConatiner: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartInfoContainer: {
    padding:10
  },
  emptyCartContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
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
    width: '90%',
   
  },
  buttonContainer: {
    alignItems: 'center', 
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  cartText: {
    fontSize: 16,
    paddingVertical: 4
  },
  emptyCartText: {
    fontSize:24,
    fontWeight:'500',
    color:'#007bff',
    marginBottom:80

  }
});

export default Cart;