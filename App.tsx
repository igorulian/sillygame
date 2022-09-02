import { StyleSheet } from 'react-native'
import { io } from "socket.io-client"
import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Match from './src/screens/Match'

const socket = io('http://192.168.0.100:3333')

const Stack = createNativeStackNavigator()


export default function App() {

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
    socket.emit('join', 'b813b730-dac8-4613-b0da-91bf1145b434');
  }

  useEffect(() => {
    setTimeout(() => {
      joinMatch()
    }, 1000);
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{title: 'Partidas', headerTitleAlign: 'center'}} name="Home" component={Home} />
        <Stack.Screen name="Match" component={Match} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
