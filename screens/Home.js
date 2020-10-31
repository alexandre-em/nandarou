import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const theme_color = "#943e3e"

function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text>logo</Text>
            </View>
            <View style={styles.stats}>
                <Text>Your Stats</Text>
            </View>
            <Button
                title="Begin a Test"
                color={theme_color}
                fontFamily="-apple-system,BlinkMacSystemFont,San Francisco,Helvetica Neue,Helvetica,Ubuntu,Roboto,Noto,Segoe UI,Arial,sans-serif" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebebeb',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "-apple-system,BlinkMacSystemFont,San Francisco,Helvetica Neue,Helvetica,Ubuntu,Roboto,Noto,Segoe UI,Arial,sans-serif"
    },
    logo: {

    },
    stats: {

    }
});

export default Home
