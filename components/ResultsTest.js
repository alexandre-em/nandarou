import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Subheading, Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import ResultSvg from '../svgs/Result'

function ResultsTest({ score, total }) {
    return (
        <SafeAreaView style={styles.container}>
            <ResultSvg />
            <Title style={styles.title}>Your score : {score} / {total}</Title>
            {score === total? <Subheading style={styles.subtitle}>Congratulation! A perfect score!</Subheading>: <Text></Text>}
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
    },
    subtitle: {
        color: "#943e3ea4"
    }
})

export default ResultsTest
