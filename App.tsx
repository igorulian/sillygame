import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Routes from './src/routes'
import 'react-native-gesture-handler'


export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={DarkTheme}>
        <Routes/>
      </NavigationContainer>
    </SafeAreaView>
  )
}
