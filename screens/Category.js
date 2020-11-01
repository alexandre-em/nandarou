import { useRoute } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import kanjiApi from '../services/kanjiApi'
import { editSelectionned } from '../store/actions/selectionnedAction'

const themeColor = "#943e3e50"

function Category() {
    const route = useRoute()
    const kanjiStore = useSelector((state) => state.selectionned)
    const dispatch = useDispatch()

    const [kanjiList, setkanjiList] = useState([])

    const edit = (character) => {
        dispatch(editSelectionned(character))
    }

    const query = async () => {
        await kanjiApi.get("/search/advanced", {
            params: {
                grade: route.params.level
            }
        })
            .then(res => {
                setkanjiList(res.data)
            })
    }

    useEffect(() => {
        setkanjiList([])
        query()
    }, [route.params.level])

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.kanji}>
                    {
                        kanjiList.map((val, i) => {
                            return <Text
                                key={i}
                                style={kanjiStore.includes(val.kanji.character) ? styles.active : styles.case}
                                onPress={() => edit(val.kanji.character)}
                            >{val.kanji.character}</Text>
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    kanji: {
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "scroll",
        flexGrow: 1,
        justifyContent: "space-around",
        alignContent: "space-between"
    },
    case: {
        fontSize: 50,
        color: "#2e1d1dc4",
        padding: 5,
        borderWidth: 1,
        borderColor: themeColor
    },
    active: {
        fontSize: 50,
        color: "#2e1d1dc4",
        padding: 5,
        borderWidth: 1,
        borderColor: themeColor,
        backgroundColor: themeColor
    }
})
export default Category
