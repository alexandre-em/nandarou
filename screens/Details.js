import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgUri from 'react-native-svg-uri'
import kanjiApi from '../services/kanjiApi'

function Details({ navigation }) {
    const route = useRoute()
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)

    const getDetails = async () => {
        setLoading(true)
        await kanjiApi.get(`/kanji/${route.params.kanji}`)
            .then(res => {
                setDetails(res.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        getDetails()
    }, [route.params.kanji])

    if (loading) return <SafeAreaView><Text>Loading ...</Text></SafeAreaView>
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.character}>
                    {details.kanji.character}
                </Text>
                <View style={styles.details}>
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
                        <Text style={styles.detailsLinesText}> {details.kanji.kunyomi.romaji} ({details.kanji.kunyomi.hiragana})</Text>
                    </View>
                    <View style={styles.detailsLinesLast}>
                        <Text style={styles.detailsLinesTextLeft}>Grade: </Text>
                        <Text style={styles.detailsLinesText}>{details.references.grade}</Text>
                    </View>
                    <Text style={styles.detailsLinesExample}>Examples</Text>
                    {details.examples.map((val, i) => {
                        return <View key={"expl", i} style={i === (details.examples.length -1)? styles.detailsLinesLast: styles.detailsLines}>
                            <Text style={styles.detailsLinesTextLeft}>{val.japanese}</Text>
                            <Text style={styles.detailsLinesText}>{val.meaning.english}</Text>
                        </View>
                    })}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    character: {
        fontSize: 200,
        color: "#582424"
    },
    details: {
        color: "gray",
        width: "90%",
    },
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
        color: "#243b58",
        fontSize: 20,
        textAlign: "center"
    },
    detailsLinesText: {
        color: "#943e3e9a",
    },
    detailsLinesTextLeft: {
        color: "#943e3ede",
        fontWeight: "bold"
    }
})

export default Details
