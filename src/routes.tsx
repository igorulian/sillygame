import { TouchableOpacity } from 'react-native'
import { io } from "socket.io-client"
import { useEffect, useLayoutEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Home from './screens/Home'
import Match from './screens/Match'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import NewMatch from './screens/NewMatch'
import { MaterialIcons } from '@expo/vector-icons'; 
import { CardStyleInterpolators, createStackNavigator  } from '@react-navigation/stack'

const socket = io('http://192.168.0.100:3333')

const Stack = createStackNavigator()

const screenOptions = {
  headerStyle: {
    backgroundColor: '#121212'
  }, 
  headerTitleStyle: {
    color: '#f5f5f5'
  },
  CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS
}

const Routes = () => {
  const navigation = useNavigation<any>()
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect')
    });

    socket.on('disconnect', () => {
      console.log('disconnect')
    });

    socket.on('pong', () => {
      console.log('pong')
    });

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    };
  }, []);

  const joinMatch = () => {
    console.log('joining')
    // socket.emit('join', 'b813b730-dac8-4613-b0da-91bf1145b434');
  }

  useLayoutEffect(() => {
    setStatusBarStyle('light')
    setStatusBarBackgroundColor('#121212', false)
  },[])

  function back(){
    navigation.goBack()
  }


  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen options={{title: 'Partidas em andamento', headerTitleAlign: 'center'}} name="Home" component={Home} />
        <Stack.Screen 
          name="Match" 
          component={Match} 
        />
        <Stack.Screen 
          name="NewMatch" 
          component={NewMatch}
          options={{
            title: 'Nova Partida',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={back} style={{marginLeft: 16}}>
                <MaterialIcons name="arrow-back-ios" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
  )
}

export default Routes