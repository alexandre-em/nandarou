import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Details from './stack/Learn/Details'
import Search from './stack/Search/Search'

const Stack = createStackNavigator()

function SearchStack() {
    return (
        <Stack.Navigator
            initialRouteName="Search"
            screenOptions={ { headerShown: false } } >
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: true }}/>
        </Stack.Navigator>
    )
}

export default SearchStack
