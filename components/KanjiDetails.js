import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function KanjiDetails({ details }) {
    return (
        <SafeAreaView>
            <View style={styles.detailsLines}>
                <Text style={styles.detailsLinesTextLeft}>Meaning: </Text>
                <Text style={styles.detailsLinesText}>{details.kanji.meaning.english}</Text>
            </View>
            <View style={styles.detailsLines}>
                <Text style={styles.detailsLinesTextLeft}>Stroke: </Text>
                <Text style={styles.detailsLinesText}>{details.kanji.strokes.count}</Text>
            </View>
            <View style={styles.detailsLines}>
                <Text style={styles.detailsLinesTextLeft}>On Yomi: </Text>
                <Text style={styles.detailsLinesText}>{details.kanji.onyomi.katakana}</Text>

            </View>
            <View style={styles.detailsLines}>
                <Text style={styles.detailsLinesTextLeft}>Kun Yomi: </Text>
                <Text style={styles.detailsLinesText}> {details.kanji.kunyomi.romaji}</Text>
            </View>
            <View style={styles.detailsLinesLast}>
                <Text style={styles.detailsLinesTextLeft}>Grade: </Text>
                <Text style={styles.detailsLinesText}>{details.references.grade}</Text>
            </View>
            <Text style={styles.detailsLinesExample}>Examples</Text>
            {details.examples.map((val, i) => {
                return <View key={"expl", i} style={i === (details.examples.length - 1) ? styles.detailsLinesLast : styles.detailsLines}>
                    <Text style={styles.detailsLinesTextLeft}>{val.japanese}</Text>
                    <Text style={styles.detailsLinesText}>{val.meaning.english}</Text>
                </View>
            })}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    detailsLines: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomWidth: .5,
        borderBottomColor: "rgba(0,0,0, .2)"
    },
    detailsLinesLast: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomWidth: 0,
    },
    detailsLinesExample: {
        padding: 5,
        fontWeight: "bold",
        color: "white",
        fontSize: 20,
        backgroundColor: "#943e3e36",
        borderRadius: 5,
        textAlign: "center",
        marginTop: 15,
    },
    detailsLinesText: {
        color: "#943e3e9a",
        flexShrink: 1,
        textAlign: "right",
        fontFamily: "Roboto_100Thin",
    },
    detailsLinesTextLeft: {
        color: "#943e3ede",
        fontFamily: "Roboto_700Bold",
    },
    list: {
        flexDirection: "column",
        backgroundColor: "red"
    }
})

export default KanjiDetails
