import { RouteProp, useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { IMatch } from "../@types/IMatch";
import Canva from "../components/Canva"

export type ParamsList = {
    Match: {
        matchID: string
    }
}

const Match = () => {
    const route = useRoute<RouteProp<ParamsList, 'Match'>>()

    return (
        <SafeAreaView style={styles.container}>
            <Canva matchID={route.params.matchID}/>
        </SafeAreaView>
    )
}

export default Match

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    },
});