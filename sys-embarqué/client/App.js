import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ascan from './Ascan';
import Home from './Home';
import CommandeScreen from './Commande';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
   
     <Stack.Navigator>
        <Stack.Screen name="Chariot 5" options={{headerStyle: {
            backgroundColor: '#4c7fc7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          statusBarAnimation: 'slide',
          statusBarStyle: 'dark',}} component={Home} />
        <Stack.Screen name="Produit" component={Ascan} />
        <Stack.Screen name="Commande" component={CommandeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bouttonAccueil: {
    marginTop: '20px',
  }
});
