import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/auth/login';
import Register from './src/component/Register';

const Stack = createStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
         headerTitleAlign: 'center' ,
        }}>
        <Stack.Screen name="Login" component={Login}  options={{ headerTitle: 'Login' }}/>
        <Stack.Screen name="Register" component={Register}  options={{ headerTitle: 'Register' }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


