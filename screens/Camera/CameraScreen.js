import React from 'react';
import { Dimensions,StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Block } from 'galio-framework'
const { width, height } = Dimensions.get('screen');
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import Constants from 'expo-constants'
import * as Location from 'expo-location'

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props)
    this.state = {
      }
    }

     
    async componentDidMount() {
        if (Platform.OS === 'web') {
          return;
        }
        //Permissions
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.LOCATION
          )
        if (status === 'granted') {
          Alert.alert('lol')
        } else {
          Alert.alert(
            'Permissions Needed!',
            'App requires Camera and Location Permission',
            [
              { text: 'OK', onPress: () => this.props.navigation.navigate('App') }
            ],
            { cancelable: false }
          );
        }
        
    }

      //button click
    takePicture = () => {
      if (this.camera) {
          this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved.bind(this) });
      }
     };
  

     //navigates to display page with photo
    onPictureSaved = photo => {
        this.props.navigation.navigate('show', { photo: photo })
    }

    render() {
      return (
         <View style={{ flex: 1, backgroundColor:'black' }}>
           <StatusBar 
          translucent={true} 
          backgroundColor={'transparent'} 
        />
          <Camera style={{ flex:1, margin:10,marginTop:Constants.statusBarHeight }} type={Camera.Constants.Type.back} ref={(ref) => { this.camera = ref }} >
            <View
              style={{
                width: width-20,
                position: 'absolute',
                height: 80,
                bottom: 0,
                padding:20,
                backgroundColor:'black',
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
              }}>
                <TouchableOpacity style={{flex:0.45}} onPress={() =>this.props.navigation.navigate('App')}>
                  <AntDesign name="back" size={34} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:0.55 }} onPress={this.takePicture.bind(this) }>
                  <MaterialCommunityIcons name="camera-iris" size={44} color="white" />
                </TouchableOpacity>
            </View>
          </Camera>
         </View>
              
        )
    }
}
