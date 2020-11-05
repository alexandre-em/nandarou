import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import KanjiDetails from '../../../components/KanjiDetails'
import Loading from '../../../components/Loading'
import kanjiApi from '../../../services/kanjiApi'

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

    if (loading) return <Loading /> 
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <SafeAreaView style={styles.container}>
                <Card width="90%" style={styles.card}>
                    <Card.Content >
                        <Text style={styles.character}>
                            {details.kanji.character}
                        </Text>
                        <View style={styles.details}>
                            <KanjiDetails details={details} />
                        </View>
                    </Card.Content>
                </Card>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,   
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingBottom: 20,
    },
    character: {
        fontSize: 200,
        color: "#582424",
        textAlign: 'center',
    },
    details: {
        color: "gray",
        width: "100%",
    },
})

export default Details
