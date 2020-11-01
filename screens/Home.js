import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const theme_color = "#943e3e"

function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Text>logo</Text>
            </View>
            <View style={styles.stats}>
                <Text>Your Stats</Text>
            </View>
            <Button
                title="Begin a Test"
                color={theme_color} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebebeb',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {

    },
    stats: {

    }
});

export default Home
