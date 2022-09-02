import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import Controller from "./Controller";

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

const mapSize = 40
const mapRatio = 3/4


const mapWidth = Dimensions.get('window').width
const playerSize = mapWidth / mapSize
const mapHeight = Math.ceil((mapWidth / mapRatio) / playerSize) * playerSize

console.log('| - Match Data')
console.log('| Map Size: ', mapSize)
console.log('| Map Ratio:', mapRatio)
console.log('| - Became')
console.log('| Map Width: ', mapWidth)
console.log('| Player Size: ', playerSize)
console.log('| Map Height: ', mapHeight)

const Entity = ({x, y, player=false}: IPixel) => {
    return (
        <View style={[styles.pixelContainerFill, {top: y * playerSize, left: x * playerSize}, {backgroundColor: player ? '#169103' : '#3333'}]}>

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

        switch(to){
            case 'up':
                setPlayerPos(prev => prev.y > 0 ? ({...prev, y: prev.y-1}) : prev)
            break
            case 'down':  
                setPlayerPos(prev => prev.y < ((mapHeight / playerSize)-1) ? ({...prev, y: prev.y+1}) : prev)
            break
            case 'left':  
                setPlayerPos(prev =>  prev.x > 0 ? ({...prev, x: prev.x-1}) : prev)
            break
            case 'right':  
                setPlayerPos(prev => prev.x < (mapSize-1) ? ({...prev, x: prev.x+1}) : prev)
            break
        }
    }

    return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-start'}}>
            <View style={styles.container}>
                <Entity x={playerPos.x} y={playerPos.y} player/>
                {matchData.map(data => 
                    <Entity key={data.player.id} x={data.x} y={data.y}/>    
                )}
            </View>
            <Controller move={move}/>
        </View>
    )
}

export default Canva

const styles = StyleSheet.create({
    container: {
        width: mapWidth,
        height: mapHeight,
        aspectRatio: mapRatio,
        backgroundColor: '#ccc'
    },
    line: {
        flexDirection: "row"
    },
    pixelContainerFill: {
        width: playerSize,
        height: playerSize,
        flex: 1,
        aspectRatio: 1,
        position: "absolute",
        borderWidth: .2,
        borderColor: '#fff'
    }
    
})