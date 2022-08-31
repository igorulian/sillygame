import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

function getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
}


interface IPlayer {
    id: number
}

interface IPosition { 
    player: IPlayer | null
}

interface IPixel {
    position: IPosition
}

const Pixel = ({position}: IPixel) => {
    return (
        <View style={position.player ? styles.pixelContainerFill : styles.pixelContainer}>

        </View>
    )
}

const lines = 20
const collums = 15


const mapbase:Array<Array<IPosition>> = Array(lines).fill(Array(collums).fill({player: null}))

const playertest = {
    id: 2
}

const Canva = () => {
    const [arena, setArena] = useState(mapbase)

    useEffect(() => {
        setArena(old => {
            
            old[16][16] = {player: playertest}
            for(let l = 0; l < old.length; l++){
                let str = ''
                for(let i = 0; i < old[l].length; i++){
                    str += ` [${l}-${i}]`
                }
                console.log(str)
            }
            return old
        })
    })

    return (
        <View style={styles.container}>
            {
                arena.map((collum) => 
                    <View key={arena.indexOf(collum)} style={styles.line}>
                        {collum.map(position => 
                            <Pixel position={position} key={`${arena.indexOf(collum)}-${collum.indexOf(position)}`}/>    
                        )}
                    </View>
                )
            }
        </View>
    )
}

export default Canva

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ccc'
    },
    line: {
        flexDirection: "row"
    },
    pixelContainer: {
        width: 20,
        height: 20,
        borderWidth: .5,
        borderColor: '#3b3b3b',
        flex: 1,
        aspectRatio: 1
    },
    pixelContainerFill: {
        width: 20,
        height: 20,
        borderWidth: .5,
        borderColor: '#3b3b3b',
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#faf',
    }
    
})