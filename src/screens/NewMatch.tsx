import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { BASE_URL } from "../util/api"


const maxPlayers = 30
const minSize = 10
const maxSize = 50

function randomID(){
    return Math.round(Math.random() * (10 - 999) + 10)
}

const NewMatch = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>()
    const [match, setMatch] = useState({
        name: `Match#${randomID().toString().replace('-', '')}`,
        size: '10',
        max: '10',
    })
    const [validData, setValidData] = useState({
        name: true,
        size: true,
        max: true
    })


    function checkValidData(){
        setValidData({
            name: match.name.length > 0,
            size: ((parseInt(match.size) >= minSize) && (parseInt(match.size) <= maxSize)),
            max: ((parseInt(match.max) > 1) && (parseInt(match.max) <= maxPlayers)),
        })
    }
    
    const allFieldsValid = validData.max && validData.name && validData.size

    async function createMatch() {
        checkValidData()
        if(loading || !allFieldsValid) return
        setLoading(true)
        try{
            await axios.post(`${BASE_URL}/match`, {
                name: match.name,
                size: parseInt(match.size) || 20,
                max: parseInt(match.max) || 10
            })
            Alert.alert('Sucesso!', 'Partida criada com sucesso')
            navigation.navigate('Home')
        }catch(error:any){
            console.log(error)
        }
        setLoading(false)
    }


    return (
        <View style={styles.page}>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput 
                style={!validData.name ? styles.inputError : styles.input}
                value={match.name}
                onChangeText={name => {setMatch(old => ({...old, name})); checkValidData()}}
                placeholder='Digite o nome da partida'
                placeholderTextColor='#6d6d6d'
                onEndEditing={checkValidData}
            />
            {!validData.name &&
                <Text style={styles.errorText}>Digite um nome válido para a partida</Text>
            }
            <Text style={styles.inputTitle}>Maximum players</Text>
            <TextInput 
                style={!validData.max ? styles.inputError : styles.input}
                keyboardType='decimal-pad'
                maxLength={2}
                value={`${match.max}`}
                onChangeText={max => setMatch(old => ({...old, max}))}
                placeholder='Digite a quantidade máxima de jogadores'
                placeholderTextColor='#6d6d6d'
                onEndEditing={checkValidData}
            />
            {!validData.max &&
                <Text style={styles.errorText}>The player limit must be between 2 and {maxPlayers}</Text>
            }
            <Text style={styles.inputTitle}>Map size</Text>
            <TextInput 
                style={!validData.size ? styles.inputError : styles.input}
                keyboardType='number-pad'
                maxLength={2}
                onEndEditing={checkValidData}
                value={`${match.size}`}
                onChangeText={size => setMatch(old => ({...old, size}))}
                placeholder='Digite o tamanho do mapa'
                placeholderTextColor='#6d6d6d'
            />
            {!validData.size &&
                <Text style={styles.errorText}>O tamanho do mapa deve ser entre {minSize} e {maxSize}</Text>
            }
            <TouchableOpacity disabled={!allFieldsValid} style={!allFieldsValid ? styles.buttonDisable : styles.button} onPress={createMatch}>
                <Text style={!allFieldsValid ? styles.buttonTextDisable : styles.buttonText}>
                    {loading ? <ActivityIndicator color='#02dac5'/> : 'Create match'}
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
    errorText: {
        color: '#F5566C',
        fontSize: 12,
        width: '100%'
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
    buttonDisable: {
        borderWidth: 1,
        borderColor: '#6d6d6d',
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
    buttonTextDisable: {
        fontWeight: 'bold',
        color: '#6d6d6d'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#02dac5'
    }
})