import { useIsFocused, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Card, Searchbar } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import ResultSearch from '../../../components/ResultSearch'
import kanjiApi from '../../../services/kanjiApi'


function Search({ navigation }) {
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState("english")
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const [parameters, setParameters] = useState({ kem: "" })

    const handleSubmit = () => {
        setLoading(true)
        kanjiApi
            .get('/search/advanced', {
                params: parameters
            })
            .then(res =>{
                 setResult(res.data)
                 setLoading(false)
                })
    }

    const filter = (filtre, parametre) => {
        setActive(filtre)
        setParameters(parametre)
        handleSubmit()
    }

    useEffect(() => {
        if (search)
            setParameters(Object.fromEntries(new Map([[Object.keys(parameters)[0], search.toLowerCase()]])))
    }, [search])

    useEffect(() => {
        setActive("english")
        setSearch("")
        setResult([])
        setParameters({ kem: "" })
    }, [isFocused])

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Card style={styles.card}>
                        <View style={styles.search}>
                            <Searchbar
                                placeholder="Search..."
                                value={search}
                                style={{ width:"90%"}}
                                inputStyle={{ fontFamily: 'Roboto_100Thin' }}
                                onIconPress={handleSubmit}
                                onSubmitEditing={handleSubmit}
                                onChangeText={setSearch}/>
                        </View>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{ width: "150%" }}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={200}
                            decelerationRate={"fast"}
                            pagingEnabled>
                            <View style={styles.button}>
                                <Button labelStyle={styles.font} mode={active !== "english" ? "outlined" : "contained"} onPress={() => filter("english", { kem: search.toLowerCase() })} color="#4066a0a9">English</Button>
                                <Button labelStyle={styles.font} mode={active !== "kanji" ? "outlined" : "contained"} onPress={() => filter("kanji", { kanji: search.toLowerCase() })} color="#4066a0a9" >Kanji</Button>
                                <Button labelStyle={styles.font} mode={active !== "onyomi" ? "outlined" : "contained"} onPress={() => filter("onyomi", { on: search.toLowerCase() })} color="#4066a0a9" >Onyomi</Button>
                                <Button labelStyle={styles.font} mode={active !== "kunyomi" ? "outlined" : "contained"} onPress={() => filter("kunyomi", { kun: search.toLowerCase() })} color="#4066a0a9" >Kunyomi</Button>
                                <Button labelStyle={styles.font} mode={active !== "romaji" ? "outlined" : "contained"} onPress={() => filter("romaji", { rjn: search.toLowerCase() })} color="#4066a0a9" >Romaji</Button>
                            </View>
                        </ScrollView>
                    </Card>
                    <Card style={styles.card}>
                        <ResultSearch result={result} search={search} loading={loading} navigation={navigation} />
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        width: "90%",
        marginVertical: 15,
        borderRadius: 5
    },
    button: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingVertical: 15,
    },
    search: {
        paddingTop: 25,
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
    },
    font: {
        fontFamily: 'Roboto_700Bold',
    }
})

export default Search 
