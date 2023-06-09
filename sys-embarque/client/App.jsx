import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ascan from './screens/Ascan';
import Home from './screens/Home';
import Achats from './screens/Achats';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
    
      <Stack.Navigator>
          <Stack.Screen name="Chariot 1" options={{headerStyle: {
              backgroundColor: '#4c7fc7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            statusBarAnimation: 'slide',
            statusBarStyle: 'dark',}} component={Home} />
          <Stack.Screen name="Produit" component={Ascan} />
          <Stack.Screen name="Achats" options={({navigation})=>({
            goBack: false,
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Produit')}
                title="Retour"
                color="red"
              />
            ),
            headerStyle: {
              backgroundColor: '#4c7fc7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            statusBarAnimation: 'slide',
            statusBarStyle: 'dark',
            
          })} component={Achats} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
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
