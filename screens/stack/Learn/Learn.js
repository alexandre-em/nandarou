import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Tile } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import kanjiApi from '../../../services/kanjiApi'

const theme_color = "#943e3ec4"

const image = [
    'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1493515322954-4fa727e97985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
]

function Learn({ navigation }) {
    const [kL, setkL] = useState([])
    const kanjiList = async () => {
        await kanjiApi.get("/kanji/all")
            .then(res => setkL(res.data.map((val, index) => <Text key={index, "kanji"}>{val.kanji.character}</Text>)))
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {Array(6).fill().map((_, i) => {
                    return (
                        <Tile
                            imageSrc={{ uri: image[i]  }}
                            imageContainerStyle={{ opacity: .9 }}
                            activeOpacity={.8}
                            title={`School grade ${i+1}`}
                            key={`category${i}`}
                            height={150}
                            containerStyle={{ backgroundColor: 'black', borderBottomWidth:2, borderTopWidth: 2, borderColor: "#ebebebeb" }}
                            titleStyle={{ fontSize: 25, fontFamily: 'Roboto_700Bold', height: "200%", width: "100%",flexDirection: 'column', textAlign: 'right', textAlignVertical: 'bottom' }}
                            style={styles.card}
                            featured
                            onPress={() => {
                                navigation.navigate('Category', {
                                    level: (i + 1)
                                })
                            }} />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-around',
    },
    card: {
        paddingVertical: 1,
    }
})

export default Learn
