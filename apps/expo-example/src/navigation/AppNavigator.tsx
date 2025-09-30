import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import BasicDemo from "../screens/BasicDemo";
import PathTypesDemo from "../screens/PathTypesDemo";
import AnimationsDemo from "../screens/AnimationsDemo";
import SocketPositionsDemo from "../screens/SocketPositionsDemo";
import LabelsDemo from "../screens/LabelsDemo";
import MultipleLinesDemo from "../screens/MultipleLinesDemo";
import ImperativeApiDemo from "../screens/ImperativeApiDemo";
import EffectsDemo from "../screens/EffectsDemo";

export type RootStackParamList = {
  Home: undefined;
  BasicDemo: undefined;
  PathTypesDemo: undefined;
  AnimationsDemo: undefined;
  SocketPositionsDemo: undefined;
  LabelsDemo: undefined;
  MultipleLinesDemo: undefined;
  ImperativeApiDemo: undefined;
  EffectsDemo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3498db",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Leader Line Examples" }}
        />
        <Stack.Screen
          name="BasicDemo"
          component={BasicDemo}
          options={{
            title: "Basic Connection",
          }}
        />
        <Stack.Screen
          name="PathTypesDemo"
          component={PathTypesDemo}
          options={{
            title: "Path Types",
          }}
        />
        <Stack.Screen
          name="AnimationsDemo"
          component={AnimationsDemo}
          options={{
            title: "Animations",
          }}
        />
        <Stack.Screen
          name="SocketPositionsDemo"
          component={SocketPositionsDemo}
          options={{
            title: "Socket Positions",
          }}
        />
        <Stack.Screen
          name="LabelsDemo"
          component={LabelsDemo}
          options={{
            title: "Labels",
          }}
        />
        <Stack.Screen
          name="MultipleLinesDemo"
          component={MultipleLinesDemo}
          options={{
            title: "Multiple Lines",
          }}
        />
        <Stack.Screen
          name="ImperativeApiDemo"
          component={ImperativeApiDemo}
          options={{
            title: "Imperative API",
          }}
        />
        <Stack.Screen
          name="EffectsDemo"
          component={EffectsDemo}
          options={{
            title: "Effects & Styling",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
