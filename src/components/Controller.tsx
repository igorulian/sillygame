import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IMovment } from "./Canva"

interface IController {
    move: (to:IMovment) => void
}

const Controller = ({move}:IController) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => move('up')} style={[styles.button, styles.top]}> 
                <Text>UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('down')} style={[styles.button, styles.bottom]}> 
                <Text>DOWN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('left')} style={[styles.button, styles.left]}> 
                <Text>LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('right')} style={[styles.button, styles.right]}> 
                <Text>RIGHT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Controller

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: '#f1f',
        marginTop: 50,
        justifyContent: 'center'
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: '#faf',
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    top: {
        top: 0
    },
    bottom: {
        bottom: 0
    },
    left: {
        left: 0,
        marginLeft: 40
    },
    right: {
        right: 0,
        marginRight: 40
    }
})