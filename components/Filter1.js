import React from "react";
import {Image, View} from 'react-native'

const Filter1=({
    face:{
        bounds:{
            width : faceWidth,
            height : faceHeight
        },
        LEFT_EYE,
        RIGHT_EYE,
        NOSE_BASE
    }
}) =>{
    const filter_width = faceWidth
    const filter_height = faceHeight/3

    const transformAngle=(
        angle_rad = Math.atan((RIGHT_EYE.y - LEFT_EYE.y)/(RIGHT_EYE.x-RIGHT_EYE.y))
    )=>(angle_rad*180)/Math.PI

    return(
        <View style={{
            position : 'absolute',
            left : LEFT_EYE.x - filter_width *0.625,
            right : LEFT_EYE.y - filter_height * 0.5
        }}>
            <Image
            source= {require('../assets/crown-pic1.png')}
            style={{
                width : filter_width,
                height : filter_height,
                resizeMode : "contain",
                transform : [{rotate :`${transformAngle}deg`}]
            }}/>
        </View>
    )
}

export default Filter1