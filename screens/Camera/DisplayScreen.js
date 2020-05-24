import React from "react";
import { Dimensions,View, Image, StyleSheet, LayoutAnimation, Alert } from "react-native";
import { Block, Button, Text, theme } from 'galio-framework'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import firebase from '../../firebase'
import Constants from 'expo-constants'
import MapView from 'expo';

const { width, height } = Dimensions.get('screen');


import uuid from 'uuid';
var uid
let weed
export default class DisplayScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props)
    this.state = {
        imageclick: null,
        loc: 'unknown',
      }
    }

      componentDidMount = () => {
        uid = firebase.auth().currentUser.uid
        const photo= this.props.navigation.getParam('photo') 
        const loc= this.props.navigation.getParam('loc') 
        
        weed = photo.width/photo.height
        this.setState({ 
          imageclick: photo.uri,
          loc
         })
         
      };
 

  submitButt = async () => {
    //   var today = new Date();
    //   const fileExtension = this.state.imageclick.split('.').pop();
    //   // console.log("EXT: " + fileExtension);
    //   const fileName = `${today}.${fileExtension}`;
    //   //console.log(fileName);
    //  // const storageRef = firebase.storage().ref(`${uid}/images/${fileName}`);
    //   //console.log(storageRef.putFile)
    // //  storageRef.putFile(this.state.imageclick);
 
      if(this.state.imageclick){
        this.uploadImage(this.state.imageclick, 'test-image')
        .then(() => {
          Alert.alert('uploaded')
        })
        .catch((error) => {
          Alert.alert(error)
        })
      }

 }

//   uploadImage = async (uri, imageName) => {

//     const responce = await fetch(uri)
//     const blob =await responce.blob()

//     var ref = firebase.storage().ref().child('images/'+ imageName)

//     return ref.put(blob)
//  }




    render() {
        LayoutAnimation.easeInEaseOut();
        const item = this.state.imageclick
        return (
            <Block >
                <Block center style={{ margin:10,marginTop:Constants.statusBarHeight + 10, width:width, height:height, paddingHorizontal:50 }}>
                  <Image style={{ aspectRatio: weed, width: '100%', height: undefined, borderWidth:5,borderColor:'#b1b1b1'}} 
                  source={{ uri: item }} />
                  <Text>hi</Text>
                  <Block
                    style={{
                      height:1,
                      width:width*0.8,
                      borderBottomColor: '#b1b1b1',
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text> Loc: {this.state.loc}</Text>
                  {/* <MapView
                    style={{ alignSelf: 'stretch', height: 400 }}
                 //   region={this.state.loc}
                  /> */}
                </Block>
                <Button onPress={() => this.submitButt() } ><Text>submit</Text></Button>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
   
    // button: {
    //     top: 100,
    //     marginHorizontal: 30,
    //     backgroundColor: "grey",
    //     borderRadius: 4,
    //     height: 52,
    //     width: 100,
    // }
});
