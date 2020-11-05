import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CardHome from '../components/CardHome';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const theme_color = "#943e3e"

function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.font}>Nandarou</Text>
            <Card style={styles.image}>
                <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1513863264647-4f895e9af85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=800' }} />
            </Card>
            <View style={styles.card}>
                <Text style={styles.section}>今日は何する？</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={260}
                    snapToAlignment="center"
                    contentInset={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: '80%'
                    }}
                    contentContainerStyle={{
                        paddingLeft: 50,
                        paddingRight: Platform.OS === 'android' ? 480 : 380,
                    }}
                    scrollEventThrottle={200}
                    decelerationRate={"fast"}
                    pagingEnabled
                >
                    <CardHome title="Learn" image={"https://images.unsplash.com/photo-1581855339095-0c282d58527b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} navigation={navigation} screen='Learn' />
                    <CardHome title="Begin a test" image={"https://images.unsplash.com/photo-1486303954368-398fea0e72cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} navigation={navigation} screen='Flashcard' />
                    <CardHome title="Search" image={"https://images.unsplash.com/photo-1584515488719-3d1032327938?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=854&q=80"} navigation={navigation} screen='Search' />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '85%',
        marginTop: 10,
    }
    ,
    card: {
        width: '100%',
        marginVertical: 20,
    },
    font: {
        fontSize: 50,
        textAlign: "center",
        color: "#783c3c",
        marginTop: 20,
        fontFamily: 'Roboto_700Bold',
    },
    section: {
        paddingLeft: 25,
        paddingBottom: 10,
        color: '#000000bb',
        fontWeight: 'bold',
        fontSize: 25,
    }
});

export default Home