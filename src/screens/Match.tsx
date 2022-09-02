import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Canva from "../components/Canva"


const Match = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Canva/>
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