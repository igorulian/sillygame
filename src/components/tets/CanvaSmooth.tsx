import { useState } from "react";
import { StyleSheet, View } from "react-native"
import Controller from "../Controller";
import Joystick from "./Joystick";


function randomPos() {
    const min = 0
    const max = 19
    const number = Math.floor(Math.random() * (max - min) + min)
    return number
}

interface IPixel {
    x: number,
    y: number,
    player?: boolean
}

const Entity = ({x, y, player=false}: IPixel) => {
    return (
        <View style={[styles.pixelContainerFill, {top: y*10*2, left: x*10*2}, {backgroundColor: player ? '#169103' : '#3333'}]}>

        </View>
    )
}

const matchData = [
    {
        x: 4,
        y: 4,
        player: {
            id: 0,
            name: 'test'
        }
    },
    {
        x: 10,
        y: 10,
        player: {
            id: 1,
            name: 'test2'
        }
    },
    {
        x: 5,
        y: 12,
        player: {
            id: 2,
            name: 'test3'
        }
    }
]

export type IMovment = 'up' | 'down' | 'left' | 'right'

const Canva = () => {
    const [playerPos, setPlayerPos] = useState({x: 0, y: 0})

    function move(to:IMovment){
        console.log(playerPos)
        if(playerPos.x === 20 || playerPos.x === -20) return
        if(playerPos.y === 20 || playerPos.y === -20) return
        switch(to){
            case 'up':  
                setPlayerPos(prev => ({...prev, y: prev.y-1}))
            break
            case 'down':  
                setPlayerPos(prev => ({...prev, y: prev.y+1}))
            break
            case 'left':  
                setPlayerPos(prev => ({...prev, x: prev.x-1}))
            break
            case 'right':  
                setPlayerPos(prev => ({...prev, x: prev.x+1}))
            break
        }
    }

    return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
            <View style={styles.container}>
                <Entity x={playerPos.x} y={playerPos.y} player/>
                {matchData.map(data => 
                    <Entity key={data.player.id} x={data.x} y={data.y}/>    
                )}
            </View>
            <Joystick move={(x,y) => {console.log(x,y)}}/>
        </View>
    )
}

export default Canva

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        aspectRatio: 1,
        backgroundColor: '#ccc'
    },
    line: {
        flexDirection: "row"
    },
    pixelContainerFill: {
        width: 20,
        height: 20,
        flex: 1,
        aspectRatio: 1,
        position: "absolute",
        borderWidth: .2,
        borderColor: '#fff'
    }
    
})