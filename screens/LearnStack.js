import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Category from './stack/Learn/Category';
import Learn from './stack/Learn/Learn';
import Details from './stack/Learn/Details';

const Stack = createStackNavigator();

function LearnStack() {
    return (
        <Stack.Navigator
            initialRouteName="Learn"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Learn" component={Learn} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default LearnStack
