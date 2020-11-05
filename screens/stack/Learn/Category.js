import { useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, Button, Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/Loading'
import kanjiApi from '../../../services/kanjiApi'
import { editSelectionned, addSelectionned, deleteAll } from '../../../store/actions/selectionnedAction'

const themeColor = "#943e3e50"

function Category({ navigation }) {
    const route = useRoute()
    const [loading, setLoading] = useState(true)
    const kanjiStore = useSelector((state) => state.selectionned)
    const dispatch = useDispatch()

    const [kanjiList, setkanjiList] = useState([])

    const edit = (character) => {
        dispatch(editSelectionned(character))
    }

    const query = async () => {
        setLoading(true)
        await kanjiApi.get("/search/advanced", {
            params: {
                grade: route.params.level
            }
        })
            .then(res => {
                setkanjiList(res.data)
                setLoading(false)
            })
    }

    const handleSelectAll = () => {
        kanjiList.forEach(val => {
            edit(val.kanji.character)
        })
    }

    useEffect(() => {
        setLoading(true)
        setkanjiList([])
        query()
    }, [route.params.level])

    if (loading) return <Loading />

    return (
        <SafeAreaView >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Card width="90%" >
                        <Card.Title
                            title={`Kanji level ${route.params.level}`}
                            titleStyle={{ textAlign: "center", fontFamily: "Roboto_700Bold" }}
                            subtitle={`results: ${kanjiList.length} -  ${kanjiStore.length} selectionned`}
                            subtitleStyle={{ width: "100%", textAlign: "center", fontFamily: "Roboto_100Thin" }}
                            style={styles.header} />
                        <View style={styles.button}>
                            {kanjiStore.length === kanjiList.length ?
                                <Button
                                    mode="outlined"
                                    onPress={handleSelectAll}
                                    labelStyle={{ fontFamily: "Roboto_700Bold" }}
                                    width="85%"
                                    color="#943e3e" >Deselect all</Button> :
                                <Button
                                    mode='contained'
                                    onPress={handleSelectAll}
                                    labelStyle={{ fontFamily: "Roboto_700Bold" }}
                                    width="85%"
                                    color="#943e3e" >Select all</Button>}
                        </View>
                        <View style={styles.kanji}>
                            {
                                kanjiList
                                    .sort((a, b) => a.kanji.stroke - b.kanji.stroke)
                                    .map((val, i) => {
                                        return <Text
                                            key={i}
                                            style={kanjiStore.includes(val.kanji.character) ? styles.active : styles.case}
                                            onPress={() => edit(val.kanji.character)}
                                            onLongPress={() => navigation.navigate('Details', { kanji: val.kanji.character })}
                                        >{val.kanji.character}</Text>
                                    })
                            }
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: .5,
        borderBottomColor: "#503e482a",
        margin: 15
    },
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20
    },
    kanji: {
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "scroll",
        flexGrow: 1,
        justifyContent: "space-evenly",
        paddingBottom: 15,
    },
    case: {
        fontSize: 50,
        color: "#2e1d1dc4",
        padding: 5,
        marginVertical: 5,
        borderWidth:1,
        borderColor: 'rgba(0,0,0,0)'
    },
    active: {
        fontSize: 50,
        color: "#2e1d1dc4",
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginVertical: 5
    }
})
export default Category