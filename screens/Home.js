import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeLogo from '../svgs/Home'
import CardHome from '../components/CardHome';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Divider } from 'react-native-paper';

const theme_color = "#943e3e"

function Home() {
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.logo}>
                <HomeLogo />
            </View> */}
            <Card style={styles.card}>
                <Text style={styles.font}>何だろう?</Text>
            </Card>
            <Card style={styles.card}>
                <Text style={styles.subtitle}>今日は何したい？</Text>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ width: '100%' }}
                    showsHorizontalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center"
                    contentInset={{
                        top: 0,
                        left: 500,
                        bottom: 0,
                        right: 500
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: '92%'
                    }}
                    scrollEventThrottle={200}
                    decelerationRate={"fast"}
                    pagingEnabled>
                    <View style={styles.cards}>
                        <CardHome title="Begin a test" image={"https://images.unsplash.com/photo-1486303954368-398fea0e72cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                        <CardHome title="Learn" image={"https://images.unsplash.com/photo-1581855339095-0c282d58527b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"} />
                        <CardHome title="Search" image={"https://images.unsplash.com/photo-1584515488719-3d1032327938?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=854&q=80"} />
                    </View>
                </ScrollView>
            </Card>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebebeb',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '90%',
        paddingVertical: 25,
        marginVertical: 20
    },
    cards: {
        flexDirection: "row",
        width: 500,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    font: {
        fontSize: 35,
        textAlign: "center",
        color: "#583c3c",
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        color: '#adadad',
    }
});

export default Home
