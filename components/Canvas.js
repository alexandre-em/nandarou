import React, { createRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CanvasM from 'react-native-canvas'
import { Button } from 'react-native-paper'

function Canvas({ strokes, showModal, nextQ }) {
    const [color, setColor] = useState("#943e3e")
    const [previousX, setPreviousX] = useState("")
    const [previousY, setPreviousY] = useState("")
    const [currentX, setCurrentX] = useState("")
    const [currentY, setCurrentY] = useState("")
    const [drawFlag, setDrawFlag] = useState(false)
    const [countStroke, setCountStroke] = useState(0)
    const canvas = createRef()

    const updateCanvas = () => {
        const ctx = canvas.current.getContext('2d');
        canvas.current.width = 300;  //キャンバスの横幅
        canvas.current.height = 400; //キャンバスの高さ
        ctx.strokeStyle = 'rgb(00, 00, 00)'; //枠線の色は黒
        ctx.strokeRect(0, 0, 300, 400);
    }

    useEffect(() => {
        updateCanvas()
    }, [])

    const onMove = (e) => {
        if (!drawFlag) return;  //フラグがオフのときは実行しない
        const ctx = canvas.current.getContext('2d');
        ctx.beginPath();

        if (currentX === '') {

            setPreviousX(previousX);
            setPreviousY(previousY);

        } else {
            setPreviousX(e.nativeEvent.locationX);
            setPreviousY(e.nativeEvent.locationY);
            ctx.moveTo(previousX, previousY);
        }

        ctx.lineTo(currentX, currentY);
        ctx.lineCap = "round";
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();

        setCurrentX(previousX);
        setCurrentY(previousY);
    }


    const onTouch = (e) => {
        setCountStroke(countStroke + 1)
        setDrawFlag(true);  //フラグをオンにする
        setPreviousX(e.nativeEvent.locationX);
        setPreviousY(e.nativeEvent.locationY);
    }

    const onTouchEnd = () => {
        setDrawFlag(false); //フラグをオフにする
        setPreviousX('');
        setPreviousY('');
        setCurrentX('');
        setCurrentY('');
    }

    const clear = () => {
        const ctx = canvas.current.getContext('2d');
        canvas.current.width = 300;  //キャンバスの横幅
        canvas.current.height = 400; //キャンバスの高さ
        ctx.strokeStyle = 'rgb(00, 00, 00)'; //枠線の色は黒
        ctx.strokeRect(0, 0, 300, 400);
        setCountStroke(0)
    }

    const next = () => {
        if (strokes === countStroke)
            showModal(canvas)
        else
            nextQ()
    }



    return (
        <View >
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text>Stroke: {countStroke} </Text>
                <View
                    style={{ width: 300, height: 400, backgroundColor: "#943e3e0a" }}
                    onTouchStart={onTouch}
                    onTouchMove={onMove}
                    onTouchEnd={onTouchEnd}>
                    <CanvasM ref={canvas} />
                </View>
                <View style={styles.button}>
                    <Button
                        mode="contained"
                        width="37%"
                        onPress={next}
                        labelStyle={{ fontFamily: "Roboto_700Bold" }}
                        color="#943e3e">Ok</Button>
                    <Button
                        mode="outlined"
                        width="37%"
                        labelStyle={{ fontFamily: "Roboto_700Bold" }}
                        onPress={clear}
                        color="#943e3e">Clear</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    }
})

export default Canvas
