import {React,Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import Camera from 'expo-camera'
import FaceDetector from 'expo-face-detector'
import StatusBar from 'expo-status-bar'

import Filter1 from '../components/Filter1'

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hasCameraPermission : null,
            faces : []
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFaceDetection = this.onFaceDetection.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }

    onCameraPermission=(status)=>{
        this.setState({hasCameraPermission : status.status === 'granted'})
    }

    onFaceDetection=(faces)=>{
        this.setState({faces : faces})
    }
    onFaceDetectionError =(error)=>{
        console.log(error)
    }

    render(){
        const {hasCameraPermission} = this.state
        if (hasCameraPermission === null){
            return <View/>
        }
        if (hasCameraPermission === false){
            return (
                <View style = {styles.container}>
                    <text>No access to camera</text>
                </View>
            )
        }
        console.log(this.state.faces)
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>
                        LOOK ME
                    </Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera 
                        style={{flex : 1}}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode : FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks : FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications : FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected = {this.onFaceDetection}
                        onFacesDetectionError = {this.onFaceDetectionError}
                    />
                    {this.state.faces.map((face)=>{
                        return <Filter1 key={`face-id-${face.faceId}`} face={face}/>
                    })}
                    <View style={styles.filterContainer}></View>
                    <View style={styles.actionContainer}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    droidSafeArea :{
        marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    headingContainer : {
        flex :0.1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    titleText : {
        fontSize : 30
    },
    cameraStyle : {
        flex : 0.65
    },
    filterContainer : {},
    actionContainer : {}
})