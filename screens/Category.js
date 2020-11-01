import { useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import kanjiApi from '../services/kanjiApi'

function Category() {
    const route = useRoute()

    const [kanjiList, setkanjiList] = useState([])
    const query = async () => {
        await kanjiApi.get("/search/advanced", {
            params: {
                grade: route.params.level
            }
        })
            .then(res => {
                console.log(res.data[0])
                setkanjiList(res.data.map((val, i) => {
                    return <Text key={i} style={styles.case}> {val.kanji.character} </Text>
                }))
            }
            )
    }

    useEffect(() => {
        setkanjiList([])
        query()
    }, [route.params.level])

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.kanji}>
                    {kanjiList}
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
        flexGrow:1,
        justifyContent: "space-around",
        alignContent: "space-between"
    },
    case: {
        fontSize: 50,
        color: "#2e1d1dc4",
        padding: 5,
        borderWidth:1,
        borderColor: "lightgray"
    }
})
export default Category
