import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card } from 'react-native-paper'

const theme_color = "#c53838"

function CardHome({ image, title }) {
    return (
        <View>
            <Card style={styles.card} >
                <Card.Cover source={{ uri: image }} />
                <Card.Actions >
                    <View style={styles.button}>
                        <Button
                            mode='contained'
                            labelStyle={{ fontFamily: "Roboto_700Bold" }}
                            color={theme_color} >{title}</Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        width: "80%",
        elevation: 4
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
})
export default CardHome
