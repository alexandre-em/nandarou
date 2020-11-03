import React from 'react'
import { StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import ErrorSvg from '../svgs/ErrorSvg'

function Error({ message }) {
    return (
        <SafeAreaView style={styles.container}>
            <ErrorSvg />
            <Title style={styles.title}>{message}</Title>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: "#943e3e"
    }
})

export default Error
