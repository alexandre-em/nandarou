import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import 'react-native-gesture-handler';

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens component
import Home from './screens/Home';
import Flashcard from './screens/Flashcard';
import LearnStack from './screens/LearnStack';
import Test from './screens/Test';
import { store, persistor } from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import SearchStack from './screens/SearchStack';
import { View } from 'react-native';
import Loading from './components/Loading';

const Tab = createMaterialBottomTabNavigator();
const theme_color = "#943e3e"

function TabNavigation() {
  const kanjiList = useSelector(state => state.selectionned)

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{ backgroundColor: theme_color }}
          initialRouteName="LearnStack"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                case "Home":
                  iconName = focused ? 'ios-home' : 'ios-home';
                  break;
                case "Flashcard":
                  iconName = focused ? 'ios-albums' : 'ios-albums';
                  break;
                case "Learn":
                  iconName = focused ? 'ios-bookmarks' : 'ios-bookmarks';
                  break;
                case "Test":
                  iconName = focused ? 'ios-checkbox' : 'ios-checkbox-outline';
                  break;
                case "Search":
                  iconName = focused ? 'ios-search' : 'ios-search';
                  break;
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={25.3} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Learn" component={LearnStack} options={{ tabBarBadge: kanjiList.length }} />
          <Tab.Screen name="Flashcard" component={Flashcard} />
          <Tab.Screen name="Test" component={Test} />
          <Tab.Screen name="Search" component={SearchStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TabNavigation />
      </PersistGate>
    </Provider>
  );

}
