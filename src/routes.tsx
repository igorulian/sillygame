import { TouchableOpacity } from 'react-native'
import { io } from "socket.io-client"
import { useEffect, useLayoutEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Home from './screens/Home'
import Match from './screens/Match'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import NewMatch from './screens/NewMatch'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import { CardStyleInterpolators, createStackNavigator  } from '@react-navigation/stack'

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

  useLayoutEffect(() => {
    setStatusBarStyle('light')
    setStatusBarBackgroundColor('#121212', true)
  },[])

  function back(){
    navigation.goBack()
  }


  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen options={{
            title: 'Matches in progress', 
            headerTitleAlign: 'center', 
            headerTitleStyle: {fontSize: 16}
          }} 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen 
          name="Match" 
          component={Match}
        />
        <Stack.Screen 
          name="NewMatch" 
          component={NewMatch}
          options={{
            title: 'New match',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 16
            },
            headerLeft: () => (
              <TouchableOpacity onPress={back} style={{marginLeft: 16}}>
                <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
  )
}

export default Routes