import {  View } from "react-native"
import Canvas from 'react-native-canvas';

const Canva = () => {

    function handleCanvas(canvas:Canvas){
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'purple'
        ctx.fillRect(0, 0, 120, 100)
    }

    return (
        <Canvas ref={handleCanvas}/>
    )
}

export default Canva