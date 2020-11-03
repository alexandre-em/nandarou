import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens component
import Home from './screens/Home';
import Flashcard from './screens/Flashcard';
import Add from './screens/Add';
import LearnStack from './screens/LearnStack';
import Test from './screens/Test';
import Word from './screens/stack/Word/Word';
import store from './store/configureStore'

const Tab = createMaterialBottomTabNavigator();
const theme_color = "#943e3e"

export default function App() {
  const [kanjiList, setKanjiList] = useState([])
  useEffect(() => {
    setKanjiList(store.getState().selectionned)
  },[])
  return (
    <Provider store={store}>
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
                  case "Word":
                    iconName = focused ? 'ios-list' : 'ios-list';
                    break;
                  case "Add":
                    iconName = focused ? 'ios-add-circle' : 'ios-add';
                    break;
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={25.3} color={color} />;
              },
            })}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Flashcard" component={Flashcard} />
            <Tab.Screen name="Learn" component={LearnStack} options={{ tabBarBadge: kanjiList.length }}/>
            <Tab.Screen name="Test" component={Test} />
            <Tab.Screen name="Word" component={Word} />
            <Tab.Screen name="Add" component={Add} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );

}
