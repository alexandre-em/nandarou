import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgUri from 'react-native-svg-uri'
import KanjiDetails from '../components/KanjiDetails'
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
        setLoading(true)
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
                    <KanjiDetails details={details} />
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
})

export default Details
