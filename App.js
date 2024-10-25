import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screen/ChatScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChatBubble from './screen/ChatBubble';
import 'react-native-gesture-handler';
import 'react-native-reanimated';


const Stack = createNativeStackNavigator();

const App=()=>{
  return (
    <SafeAreaProvider>
<NavigationContainer>
<Stack.Navigator initialRouteName='ChatScreen'>
<Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}  />
<Stack.Screen name="ChatBubble" component={ChatBubble} options={{ headerShown: false }}  />
</Stack.Navigator>
</NavigationContainer>
</SafeAreaProvider>
        
  );
}
 export default App;



