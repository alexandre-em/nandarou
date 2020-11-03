import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Card, Modal, Portal, Provider, Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Canvas from '../components/Canvas'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ResultsTest from '../components/ResultsTest'
import kanjiApi from '../services/kanjiApi'
import Choose from '../svgs/Choose'
import Wrong from '../svgs/Wrong'

function Flashcard({ navigation, isFocused }) {
    const kanjiStore = useSelector((state) => state.selectionned)
    const [kanji, setKanji] = useState({})
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [score, setScore] = useState(0)
    const [question, setQuestion] = useState(1)

    const TOTAL_QUESTION = 20


    const getKanji = async () => {
        setLoading(true)
        const rand = kanjiStore[Math.floor(Math.random() * kanjiStore.length)]
        await kanjiApi
            .get(`/kanji/${rand}`)
            .then(res => {
                setKanji({
                    kanji: res.data.kanji.character,
                    english: res.data.kanji.meaning.english,
                    onyomi: res.data.kanji.onyomi.katakana,
                    kunyomi: res.data.kanji.kunyomi.hiragana,
                    stroke: res.data.kanji.strokes.count
                })
                setLoading(false)
            })
    }

    const showModal = () => {
        setVisible(true)
    }
    const hideModal = () => {
        setVisible(false)
    }
    const showModal2 = () => {
        setVisible2(true)
    }
    const hideModal2 = () => {
        setVisible2(false)
    }

    const handleCorrect = () => {
        setScore(score + 1)
        setQuestion(question + 1)
        setVisible(false)
        getKanji()
    }

    const handleIncorrect = () => {
        setQuestion(question + 1)
        setVisible(false)
        setVisible2(false)
        getKanji()
    }
    useEffect(() => {
        if (kanjiStore>0)
            getKanji()
    }, [])

    if (loading) return <Loading />
    if ((kanjiStore.length === 0) && (!loading)) return <Error message={"There is no Kanji selected..."}/>
    if (question === TOTAL_QUESTION) return <ResultsTest score={score} total={TOTAL_QUESTION} />
    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Choose />
                    <Title>Answer: {kanji.kanji}</Title>
                    <View style={styles.buttons}>
                        <Button
                            mode="contained"
                            onPress={handleCorrect}
                            color="#16da57">Correct</Button>
                        <Button
                            mode="contained"
                            onPress={handleIncorrect}
                            color="#943e3e">Incorrect</Button>
                    </View>
                </Modal>
                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={styles.modal} >
                    <Wrong />
                    <Title>Wrong number of strokes </Title>
                    <Title style={{ color: "#943e3ea3" }}>Answer: {kanji.kanji}</Title>
                    <View style={styles.buttons}>
                        <Button
                            mode="contained"
                            onPress={handleIncorrect}
                            color="#943e3e"
                        >Next</Button>
                    </View>
                </Modal>
            </Portal>

            <SafeAreaView style={styles.container}>
                <Card width="90%">
                    <Card.Title
                        style={styles.header}
                        title={`English : ${kanji.english}`}
                        titleStyle={{ textAlign: "center" }}
                        subtitle={`Q.${question}/ Score: ${score}`}
                        subtitleStyle={{ width: "100%", textAlign: "center" }}
                    />
                    <View style={styles.canvas}>
                        <Canvas strokes={kanji.stroke} showModal={showModal} nextQ={showModal2} />
                    </View>
                </Card>
            </SafeAreaView>
        </Provider>
    )

}
const styles = StyleSheet.create({
    header: {
        borderBottomWidth: .3,
        borderBottomColor: '#503e482a'
    },
    modal: {
        backgroundColor: "white",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        width: "80%"
    },
    canvas: {
        height: "88%"
    }
})

export default Flashcard
