import axios from "axios"
import { useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BASE_URL } from "../util/api"


const NewMatch = () => {
    const [loading, setLoading] = useState(false)
    const [match, setMatch] = useState({
        name: '',
        size: '10',
        max: '10',
    })

    async function createMatch() {
        if(loading) return
        setLoading(true)
        try{
            await axios.post(`${BASE_URL}/match`, {
                name: match.name,
                size: parseInt(match.size) || 20,
                max: parseInt(match.max)
            })
            console.log({
                name: match.name,
                size: parseInt(match.size) || 20,
                max: parseInt(match.max)
            })
            Alert.alert('Sucesso!', 'Partida criada com sucesso')
        }catch(error:any){
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <View style={styles.page}>
            <Text style={styles.inputTitle}>Nome</Text>
            <TextInput 
                style={styles.input}
                value={match.name}
                onChangeText={name => setMatch(old => ({...old, name}))}
            />
            <Text style={styles.inputTitle}>Máximo de jogadores</Text>
            <TextInput 
                style={styles.input}
                keyboardType='decimal-pad'
                maxLength={2}
                value={`${match.max}`}
                onChangeText={max => setMatch(old => ({...old, max}))}
            />
            <Text style={styles.inputTitle}>Tamaho do mapa</Text>
            <TextInput 
                style={styles.input}
                keyboardType='number-pad'
                maxLength={2}
                value={`${match.size}`}
                onChangeText={size => setMatch(old => ({...old, size}))}
            />
            <TouchableOpacity style={styles.button} onPress={createMatch}>
                <Text style={styles.buttonText}>
                    {loading ? <ActivityIndicator color='#02dac5'/> : 'Criar partida'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewMatch


const styles = StyleSheet.create({
    page: {
        flex: 1, 
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#1c1c1c',
        borderRadius: 8,
        padding: 10,
        color: '#ccc'
    },
    inputError: {
        width: '100%',
        height: 50,
        backgroundColor: '#1c1c1c',
        borderRadius: 8,
        borderColor: '#F5566C',
        borderWidth: 1,
        padding: 10,
        color: '#ccc'
    },
    inputTitle: {
        width: '100%',
        color: '#fff',
        marginBottom: 5,
        fontSize: 12,
        marginTop: 15
    },
    button: {
        borderWidth: 1,
        borderColor: '#02dac5',
        width: '100%',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        bottom: 0,
        margin: 16,
        position: 'absolute',
        backgroundColor: '#1c1c1c'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#02dac5'
    }
})