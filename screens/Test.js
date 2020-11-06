import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button, Card, Modal, Portal, Provider, TextInput, Title } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import Error from '../components/Error'
import Loading from '../components/Loading'
import ResultsTest from '../components/ResultsTest'
import kanjiApi from '../services/kanjiApi'
import Choose from '../svgs/Choose'
import Wrong from '../svgs/Wrong'
import { Input } from 'react-native-elements';

function Test() {
    const kanjiStore = useSelector((state) => state.selectionned)
    const [kanji, setKanji] = useState({})
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [score, setScore] = useState(0)
    const [question, setQuestion] = useState(1)
    const isFocused = useIsFocused()

    const TOTAL_QUESTION = 20

    const getKanji = async () => {
        setLoading(true)
        const rand = kanjiStore[Math.floor(Math.random() * kanjiStore.length)]
        await kanjiApi
            .get(`/kanji/${rand}`)
            .then(res => {
                let example = res.data.examples[Math.floor(Math.random() * res.data.examples.length)]
                let word = example.japanese.split('（')
                setKanji({
                    word: word[0],
                    read: word[1].slice(0, word[1].length - 1),
                    english: example.meaning.english,
                })
                console.log(word)
                setLoading(false)
            })
    }
    const hideModal = () => {
        setVisible(false)
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

    const handleSubmit = () => {
        if (answer === kanji.read) {
            setVisible(true)
            setAnswer('')
        }
        else {
            setVisible2(true)
            setAnswer('')
        }
    }


    useEffect(() => {
        setScore(0)
        setQuestion(1)
        if (kanjiStore.length > 0)
            getKanji()
    }, [isFocused])

    if (loading) return <Loading />
    if ((kanjiStore.length === 0) && (!loading)) return <Error message={"No Kanji selected..."} />
    if (question === TOTAL_QUESTION) return <ResultsTest score={score} total={TOTAL_QUESTION} />
    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Choose />
                    <Title style={styles.font}>Correct!</Title>
                    <View style={styles.buttons}>
                        <Button
                            mode="contained"
                            onPress={handleCorrect}
                            labelStyle={styles.buttonsFont}
                            color="#16da57">Next</Button>
                    </View>
                </Modal>
                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={styles.modal} >
                    <Wrong />
                    <Title style={styles.font}>Wrong answer...</Title>
                    <Title style={styles.font}>Answer: {kanji.read}</Title>
                    <View style={styles.buttons}>
                        <Button
                            mode="contained"
                            onPress={handleIncorrect}
                            labelStyle={styles.buttonsFont}
                            color="#943e3e">Next</Button>
                    </View>
                </Modal>
            </Portal>

            <SafeAreaView style={styles.container}>
                <Card width="90%" style={styles.card}>
                    <Card.Title
                        style={styles.header}
                        title={`English : ${kanji.english}`}
                        titleStyle={{ textAlign: "center", fontFamily: "Roboto_700Bold" }}
                        subtitle={`Question ${question}`}
                        subtitleStyle={{ width: "100%", textAlign: "center", fontFamily: "Roboto_100Thin" }}
                    />
                    <View style={styles.cardContainer}>
                        <Text style={styles.word}>{kanji.word}</Text>
                        <View style={styles.input}>
                            <Input label='Yomikata' onChangeText={text => setAnswer(text)} width='100%' />
                            <Button mode='contained' onPress={handleSubmit} labelStyle={styles.buttonsFont} color="#943e3e">Next</Button>
                        </View>
                    </View>
                </Card>
            </SafeAreaView>
        </Provider>
    )

}
const styles = StyleSheet.create({
    header: {
        borderBottomWidth: .3,
        borderBottomColor: '#503e482a',
        fontFamily: "Roboto_100Thin",
    },
    modal: {
        backgroundColor: "white",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 20,
        paddingTop: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
        width: "80%"
    },
    buttonsFont: {
        fontFamily: 'Roboto_700Bold'
    },
    card: {
        height: '100%',
    },
    font: {
        fontFamily: "Roboto_300Light",
        color: "#5221219f",
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    word: {
        textAlign: 'center',
        fontFamily: 'Roboto_700Bold',
        fontSize: 30,
        color: '#000000bb'
    },
    input: {
        height: '50%',
        justifyContent: 'space-evenly'
    }
})

export default Test