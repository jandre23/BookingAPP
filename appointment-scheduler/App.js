import "react-native-gesture-handler";
import CollapsibleList from "react-native-collapsible-list";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import BookingScreen from "./app/screens/BookingScreen";
import ConfirmationScreen from "./app/screens/ConfirmationScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="BookingScreen"
          component={BookingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmationScreen"
          component={ConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
