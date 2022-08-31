import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig } from "react-native-reanimated"
import { IMovment } from "./Canva"

const springConfig:WithSpringConfig = {
    velocity: 1000,
    overshootClamping: false,
    mass: .1
}

const JSize = 1000

interface IJoystick {
    move: (x:number,y:number) => void
}

const Joystick = ({move}:IJoystick) => {
    const posX = useSharedValue(0)
    const posY = useSharedValue(0)

    const onGestureEvent = useAnimatedGestureHandler({
        onStart() {

        },
        onActive(event) {
            const {translationX, translationY} = event
            
            if(((translationX < JSize) && (translationX > -JSize)) && ((translationY < JSize) && (translationY > -JSize))){
                posX.value = translationX
                posY.value = translationY
                move(0,0)
            }
        },
        onEnd() {
            posX.value = withSpring(0, springConfig)
            posY.value = withSpring(0, springConfig)
            // move(0,0)
        }
    })

    const positionStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: posX.value},
                {translateY: posY.value}
            ]
        }
    })

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.stick, positionStyle]}/>
            </PanGestureHandler>
        </View>
    )
}

export default Joystick

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#ff1f',
        marginTop: 50,
        justifyContent: 'center'
    },
    stick: {
        width: 60,
        height: 60,
        backgroundColor: '#09b1ff',
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50
    }
})