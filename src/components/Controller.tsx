import { Feather, MaterialIcons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IMovment } from "./Canva"

interface IController {
    move: (to:IMovment) => void
}

const Controller = ({move}:IController) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => move('up')} style={[styles.button, styles.top]}> 
                <MaterialIcons size={40} name="keyboard-arrow-up" style={{color: '#333'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('down')} style={[styles.button, styles.bottom]}> 
                <MaterialIcons size={40} name="keyboard-arrow-down" style={{color: '#333'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('left')} style={[styles.button, styles.left]}> 
                <MaterialIcons size={40} name="keyboard-arrow-left" style={{color: '#333'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => move('right')} style={[styles.button, styles.right]}> 
                <MaterialIcons size={40} name="keyboard-arrow-right" style={{color: '#333'}}/>
            </TouchableOpacity>
        </View>
    )
}

export default Controller

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        marginBottom: 20
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#ccc',
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
        marginLeft: 100
    },
    right: {
        right: 0,
        marginRight: 100
    }
})