import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
export default class CameraScreen extends React.Component {


    State = {
        permissionsGranted: false,
      };

     
    async componentDidMount() {
        if (Platform.OS === 'web') {
          return;
        }
    
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permission: status, permissionsGranted: status === 'granted' });
    
        try {
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos');
        } catch (error) {
          // tslint:disable-next-line no-console
          console.log(error, 'Directory exists');
        }
      }
      takePicture = () => {
        if (this.camera) {
            this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
        }
     };
  
    onPictureSaved = photo => {
        console.log(photo);
    } 

    render() {
        
            if (this.State.permission === null) {
                return <View />;
              }
              if (this.State.permission === false) {
                return <Text>No access to camera</Text>;
              }
              return (
                <View style={{ flex: 1 }}>
                  <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={(ref) => { this.camera = ref }} >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                      }}>

    <TouchableOpacity style={{alignSelf: 'center', justifyContent: "center"}} onPress={this.takePicture}>
          <Text style={{ fontSize: 22, color: 'white' }}>capture</Text> 
    </TouchableOpacity>
                          
                      <TouchableOpacity
                        style={{
                          flex: 0.1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                        }}
                        onPress={() =>this.props.navigation.navigate('App')}
                        >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> back </Text>
                      </TouchableOpacity>
                   
                    </View>
                  </Camera>
                </View>
              
        )
    }
}
