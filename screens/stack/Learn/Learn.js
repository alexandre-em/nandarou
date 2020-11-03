import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import kanjiApi from '../../../services/kanjiApi'

const theme_color = "#943e3ec4"

function Learn({ navigation }) {
    const [kL, setkL] = useState([])
    const kanjiList = async () => {
        await kanjiApi.get("/kanji/all")
            .then(res => setkL(res.data.map((val, index) => <Text key={index, "kanji"}>{val.kanji.character}</Text>)))
    }
    return (
        <SafeAreaView style={styles.container}>
            {Array(6).fill().map((_, i) => {
                return (
                    <Text key={i + "category"} style={styles.button} onPress={() => {
                        navigation.navigate("Category", {
                            level: (i + 1)
                        })
                    }} >Level {i + 1}</Text>
                )
            })}
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
        padding: "10%",
        marginLeft: 15,
        marginRight: 15,
    }
})

export default Learn
