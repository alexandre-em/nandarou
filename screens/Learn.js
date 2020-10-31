import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'

const theme_color = "#943e3e"

function Learn({navigation}) {
    return (
        <View style={styles.container}>
            {/* <Button title="Level 1"
                color={theme_color} />
            <Button title="Level 1"
                color={theme_color} />
            <Button title="Level 1"
                color={theme_color} />
            <Button title="Level 1"
                color={theme_color} />
            <Button title="Level 1"
                color={theme_color} /> */}
                <Text style={styles.button} onPress={navigation.navigate("Category")}>Level 1</Text>
                <Text style={styles.button}>Level 1</Text>
                <Text style={styles.button}>Level 1</Text>
                <Text style={styles.button}>Level 1</Text>
                <Text style={styles.button}>Level 1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-around',
    },
    button:{
        backgroundColor: theme_color,
        textAlign: "center",
        color: "#fff",
        padding: "13%"
    }
})

export default Learn
