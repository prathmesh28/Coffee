import React from 'react';
import { Image, Dimensions,StatusBar, StyleSheet, Text, View,Button, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
const { width, height } = Dimensions.get('screen');
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import Modal from 'react-native-modal';
export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props)
    this.state = {
      photo:{
        "height": 4000,
        "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540prthmsh18%252Fcoffee/Camera/53ae5628-6eb2-402a-881f-3dc8741d2f0e.jpg",
        "width": 3000,
      },
      isModalVisible:false
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
       //   Alert.alert('lol')
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
      console.log(photo)
      this.setState({ photo})
      this.camera.pausePreview()
     // Camera.pausePreview()
      this.setState({isModalVisible: !this.state.isModalVisible});
     //   this.props.navigation.navigate('Show', { photo: photo })
    }

    render() {
      return (
         <View style={{ flex: 1, backgroundColor:'black',alignItems:"center",justifyContent:"center" }}>
           <StatusBar 
              translucent={true} 
            />
          <Camera style={{ marginTop:Constants.statusBarHeight,width:width*0.9,height:height*0.9
          
           }} type={Camera.Constants.Type.back} ref={(ref) => { this.camera = ref }} >

             <View style={{flex: 1}}>
            
              <Modal isVisible={this.state.isModalVisible}>
              <View
              style={{
                padding:20,
                alignItems:"center",
              }}>
                
                <Image style={{ aspectRatio: this.state.photo.width/this.state.photo.height,  width: '100%', height: undefined, borderWidth:5,borderColor:'#b1b1b1'}} 
                  source={{ uri: this.state.photo.uri }} />
                  <View
              style={{
               // width: width-20,
                position: 'relative',
                padding:20,
                bottom:0,
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
              }}>
                <TouchableOpacity style={{marginHorizontal:30}} onPress={() =>this.props.navigation.navigate('App')}>
                  <AntDesign name="delete" size={34} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:30}} onPress={()=>this.props.navigation.navigate('Show', { photo: this.state.photo }) }>
                <MaterialCommunityIcons name="page-next-outline" size={34} color="white" />
                </TouchableOpacity>
                </View>
                </View>
              </Modal>
            </View>

            <View
              style={{
                width: width-20,
                position: 'absolute',
                height: 80,
                bottom: 0,
                padding:20,
                backgroundColor:'transparent',
               // backgroundColor:'black',
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
