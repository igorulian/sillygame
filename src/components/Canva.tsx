import { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native"
import { io } from "socket.io-client";
import { IMatch } from "../@types/IMatch";
import { IPlayer } from "../@types/IPlayer";
import Controller from "./Controller";

export const socket = io('http://192.168.0.100:3333')

interface IEntity {
    player: IPlayer,
    match: IMatch
}

interface IPlayerEntity {
    x: number,
    y: number,
    match: IMatch,
    color?: string
}


const mapRatio = 3/4
const screenWidth = Dimensions.get('screen').width

const Player = ({match, x, y, color}: IPlayerEntity) => {
    const size = screenWidth / match.size
    return (
        <View style={[styles.pixelContainerFill,{width: size, height: size} ,{top: y * size, left: x * size}, {backgroundColor: color || '#bb86fc'}]}>

        </View>
    )
}

const Entity = ({player, match}: IEntity) => {
    const {x, y, id} = player
    const size = screenWidth / match.size

    if(id === socket.id) return <></>

    return (
        <View style={[styles.pixelContainerFill,{width: size, height: size} ,{top: y * size, left: x * size}, {backgroundColor: '#5c5c5ccc'}]}>

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
    const playerSize = screenWidth / match.size
    const mapHeight = Math.ceil((screenWidth / mapRatio) / playerSize) * playerSize
    
    useEffect(() => {
        socket.emit('join', {matchID}, (callback:ICallBack) => {
            setMatch(callback.match)
            const {x,y} = callback.match.players.filter(player =>
                player.id === socket.id)[0]
            setPlayerPos({x,y})
            setJoining(false)
            console.log(callback.match)
        })

        socket.on(`update-${matchID}`, ({match}) => {
            setMatch(match)
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
                <Player match={match} x={playerPos.x} y={playerPos.y}/>
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
        width: screenWidth,
        aspectRatio: mapRatio,
        backgroundColor: '#121212'
    },
    line: {
        flexDirection: "row"
    },
    pixelContainerFill: {
        flex: 1,
        aspectRatio: 1,
        position: "absolute"
    }
    
})