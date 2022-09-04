import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import { io } from "socket.io-client";
import { IMatch } from "../@types/IMatch";
import { IPlayer } from "../@types/IPlayer";
import Controller from "./Controller";

export const socket = io('http://192.168.0.112:3333')

interface IPixel {
    player: IPlayer,
    match: IMatch
}

const mapRatio = 3/4
const mapWidth = Dimensions.get('window').width

const Entity = ({player, match}: IPixel) => {
    const {x, y, id} = player
    const isCurrentPlayer = (socket.id === id)
    const playerSize = mapWidth / match.size
    return (
        <View style={[styles.pixelContainerFill,{width: playerSize, height: playerSize} ,{top: y * playerSize, left: x * playerSize}, {backgroundColor: isCurrentPlayer ? '#bb86fc' : '#3333'}]}>

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

interface ICanva {
    matchID: string
}

const defaultMatch = {
    "id": "111",
    "max": 10,
    "name": "Tea",
    "players": [],
    "size": 20,
}

interface ICallBack {
    match: IMatch
}

const Canva = ({matchID}: ICanva) => {
    const [match, setMatch] = useState<IMatch>(defaultMatch)
    const [joining, setJoining] = useState(true)
    const [playerPos, setPlayerPos] = useState({x: 0, y: 0})
    const [playerSize] = useState(mapWidth / match.size)
    const [mapHeight] = useState(Math.ceil((mapWidth / mapRatio) / playerSize) * playerSize)
    
    useEffect(() => {
        socket.emit('join', {matchID}, (callback:ICallBack) => {
            setMatch(callback.match)
            const {x,y} = callback.match.players.filter(player =>
                player.id === socket.id)[0]
            setPlayerPos({x,y})
            setJoining(false)
        })

        socket.on(`update-${matchID}`, ({match}) => {
            setMatch(match)
            console.log('update match')
        });
    
        return () => {
          socket.off('connect')
          socket.off('disconnect')
          socket.emit('exit', {matchID})
        };
      }, []);

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
                setPlayerPos(prev => prev.x < (match.size-1) ? ({...prev, x: prev.x+1}) : prev)
            break
        }
        socket.emit('move', {matchID, x: playerPos.x, y: playerPos.y}, (callback:ICallBack) => {
            setMatch(callback.match)
        })
    }

    if(joining) return <View/>

    return (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-start'}}>
            <View style={[styles.container, {height: mapHeight}]}>
                {match?.players.map(player => 
                    <Entity key={player.id} player={player} match={match}/>    
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
        aspectRatio: mapRatio,
        backgroundColor: '#1c1c1c'
    },
    line: {
        flexDirection: "row"
    },
    pixelContainerFill: {
        flex: 1,
        aspectRatio: 1,
        position: "absolute",
        borderWidth: .2,
        borderColor: '#fff'
    }
    
})