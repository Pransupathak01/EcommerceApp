import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './auth/login';
import Register from './component/Register';
import Products from './component/Products';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import OrderPlaced from './component/OrderPlaced';

const Stack = createStackNavigator();
const LOGIN_TIMEOUT = 60 * 60 * 1000;

const EcommerceApp = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  const checkLoginTimeout = async () => {
    try {
      const loginTimestamp = await AsyncStorage.getItem('loginTimestamp');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (loginTimestamp && storedEmail && storedPassword) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(loginTimestamp);

        if (timeElapsed < LOGIN_TIMEOUT) {
          setInitialRoute('Products');
        } else {
          Alert.alert('Session Expired', 'Your session has expired, please log in again.');
          await AsyncStorage.removeItem('loginTimestamp');
          setInitialRoute('Login');
        }
      } else {
        setInitialRoute('Login');
      }
    } catch (error) {
      console.log('Error checking login timeout:', error);
      setInitialRoute('Login');
    }
  };

  useEffect(() => {
    checkLoginTimeout();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ headerTitle: 'Register' }} />
        <Stack.Screen
          name="Products"
          component={Products}
          options={({ navigation }) => ({
            headerTitle: 'Products',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Ionicons name="cart" size={24} style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'Cart' }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerTitle: 'Checkout' }} />
        <Stack.Screen name="OrderPlaced" component={OrderPlaced}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default EcommerceApp;
