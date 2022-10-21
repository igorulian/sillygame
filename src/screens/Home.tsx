import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IMatch } from "../@types/IMatch"
import { BASE_URL } from "../util/api"

interface IMatchComponent {
    match: IMatch,
    last: boolean
}
const Match = ({match, last}: IMatchComponent) => {
    const navigation = useNavigation<any>()
    
    function joinMatch(){
        navigation.navigate('Match', {matchID: match.id})
    }

    return (
        <TouchableOpacity onPress={joinMatch} style={{...styles.matchContainer, marginBottom: last ? 100 : 0}}>
            <Text style={styles.matchText}>{match.name}</Text>
            <Text style={styles.matchTextDescription}>{match.size}x</Text>
            <Text style={styles.matchTextPlayers}>{match.players.length} / {match.max}</Text>
        </TouchableOpacity>
    )
}

const Home = () => {
    const [matches, setMatches] = useState<IMatch[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<any>()
    
    async function fetchMatches(){
        setLoading(true)
        try{
            const {data} = await axios.get(`${BASE_URL}/matches`)
            console.log(data)
            setMatches(data)
        }catch(error:any){
            console.log(error)
        }
        setLoading(false)
    }

    async function goToCreateMatch() {
        navigation.navigate('NewMatch')
    }
    
    useEffect(() => {
        fetchMatches()
        navigation.addListener('focus', () => fetchMatches())
    },[])

    return (
        <View style={styles.page}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{width: '100%', paddingBottom: 100}}
                data={matches}
                refreshing={loading}
                onRefresh={() => fetchMatches()}
                ItemSeparatorComponent={() => <View style={{height: 20}}/>}
                renderItem={({item, index}) => 
                    <Match 
                        match={item} 
                        last={index === (matches.length-1)}
                    />
                }
            />
            {!loading && (matches.length === 0) && 
                <Text style={styles.textNotFound}>No matches in progress :|</Text>
            }
            <TouchableOpacity style={styles.button} onPress={goToCreateMatch}>
                <Text style={styles.buttonText}>+ New match</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    matchContainer: {
        height: 90,
        borderRadius: 8,
        width: '100%',
        backgroundColor: '#1c1c1c',
        borderWidth: 1,
        borderColor: '#bb86fc',
        padding: 10
    },
    textNotFound: {
        color: '#ccc',
        position: 'absolute',
        alignSelf: 'center'
    },
    matchText: {
        color: '#bb86fc',
        fontWeight: 'bold'
    },
    matchTextDescription: {
        color: '#bb86fc',
        opacity: .5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 10
    },
    matchTextPlayers: {
        color: '#bb86fc',
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        margin: 10
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
});