import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import kanjiApi from '../services/kanjiApi'

const theme_color = "#943e3ec4"

function Learn({ navigation }) {
    const [kL, setkL] = useState([])
    const kanjiList = async () => {
        await kanjiApi.get("/kanji/all")
            .then(res => setkL(res.data.map((val, index) => <Text key={index, "kanji"}>{val.kanji.character}</Text>)))
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 1
                })
            }} >Level 1</Text>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 2
                })
            }
            } >Level 2</Text>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 3
                })
            }} >Level 3</Text>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 4
                })
            }} >Level 4</Text>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 5
                })
            }} >Level 5</Text>
            <Text style={styles.button} onPress={() => {
                navigation.navigate("Category", {
                    level: 6
                })
            }} >Level 6</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: theme_color,
        textAlign: "center",
        color: "#fff",
        padding: "10%"
    }
})

export default Learn
