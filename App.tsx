import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Canva from './src/components/Canva';
import { io } from "socket.io-client";
import { useEffect } from 'react';

const socket = io('http://192.168.0.100:3333')

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
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    console.log('joining')
    socket.emit('join', 'b813b730-dac8-4613-b0da-91bf1145b434');
  }

  useEffect(() => {
    setTimeout(() => {
      sendPing()
    }, 1000);
  },[])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Canva/>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
