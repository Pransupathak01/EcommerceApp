import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
        if ( !email || !password ) {
            Alert.alert('Registration Failed', 'Please fill out all fields');
            return;
        }
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
  
        if (email === storedEmail && password === storedPassword) {
          const loginTimestamp = Date.now().toString();
          await AsyncStorage.setItem('loginTimestamp', loginTimestamp);
            Alert.alert('Login Successfull');
            navigation.navigate("Products")
          
        } else {
          Alert.alert('Login Failed', 'Incorrect email or password');
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 36,
      paddingBottom:120
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight:'500',
        textAlign: 'center',        
      },
      input: {
        height: 46,
        fontSize:16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:8,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
      },
    button: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginVertical:10
      },
      buttonText: {
        color: '#fff',
        fontSize: 18, 
      },
      link: {
        marginTop: 20,
        alignItems: 'center',
      },
      linkText: {
        color: '#007bff',
        fontSize: 16,
        textAlign: 'center',
      },
    
  });

export default Login;





