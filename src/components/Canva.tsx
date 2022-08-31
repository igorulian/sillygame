import { useState } from "react";
import { StyleSheet, View } from "react-native"


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

type movment = 'up' | 'down' | 'left' | 'right'

const Canva = () => {

    function move(to:movment){

    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Entity x={0} y={0} player/>
                {matchData.map(data => 
                    <Entity key={data.player.id} x={data.x} y={data.y}/>    
                )}
            </View>
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