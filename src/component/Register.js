import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Registration Failed', 'Please fill out all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Registration Failed', 'Passwords do not match');
            return;
        }

        try {
            await AsyncStorage.setItem('fullName', fullName);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            Alert.alert('Registration Successful', 'You can now log in');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="fullName"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setemail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 36,
        paddingVertical:72,
        paddingBottom: 120
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    input: {
        height: 46,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
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
        marginVertical: 10
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

export default Register;





