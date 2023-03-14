import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Todo from "./components/todo";
import Login from "./components/login";
import Register from "./components/register";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todo" screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
