import React from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Loading() {
    return (
        <SafeAreaView style={styles.loading}>
            <ActivityIndicator animating={true} color="#943e3e" />
            <Text style={styles.loadingText}>Loading ...</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        paddingLeft: 10,
        color: "#943e3e"
    },
})

export default Loading
