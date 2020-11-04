import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { List } from 'react-native-paper'
import Loading from './Loading'

function ResultSearch({ search, result, loading, navigation }) {
    if (loading)
        return (<View style={{ paddingBottom: 25 }}>
            <Loading />
        </View>)
    return (
        <View>
            <List.Section>
                <List.Subheader style={styles.font}>Results of "{search}"({result.length})</List.Subheader>
                {result.map((val, i) => {
                    return (
                        <ListItem key={"result" + i} bottomDivider={i !== (result.length - 1)} onPress={() => navigation.navigate('Details', { kanji: val.kanji.character })}>
                            <Icon name="g-translate" size={45} color="#8c6ca1eb" />
                            <ListItem.Content>
                                <ListItem.Title style={styles.font}>{val.kanji.character}</ListItem.Title>
                                <ListItem.Subtitle style={styles.font}>Stroke : {val.kanji.stroke}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                })}
            </List.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'Roboto_100Thin',
    }
})

export default ResultSearch
