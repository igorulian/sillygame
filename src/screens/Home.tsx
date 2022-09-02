import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Alert, FlatList, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BASE_URL } from "../util/api"


const Match = () => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const Home = () => {
    const [matches, setMatches] = useState([{}])
    const [loading, setLoading] = useState(true)
    
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
    
    useEffect(() => {
        fetchMatches()
    },[])

    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                style={{width: '100%'}}
                data={matches}
                refreshing={loading}
                onRefresh={() => fetchMatches()}
                ItemSeparatorComponent={() => <View style={{height: 20}}/>}
                renderItem={() => 
                    <Match/>
                }
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    container: {
        height: 90,
        borderRadius: 8,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#E8E8E8'
    }
});