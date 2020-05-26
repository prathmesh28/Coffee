import React from "react";
import { Dimensions,View, Image, StyleSheet, LayoutAnimation, Alert } from "react-native";
import { Block, Button, Text, theme } from 'galio-framework'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import firebase from '../../firebase'
import Constants from 'expo-constants'
//import MapView from 'expo';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location'

const { width, height } = Dimensions.get('screen');


import uuid from 'uuid';
var uid
let weed
let LatLng = {
  latitude: 37,
  longitude: -122,
}
export default class DisplayScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };

  constructor(props) {
    super(props)
    this.state = {
        imageclick: null,   
        lat:37,
        lon:-122
      }
    }

    async componentDidMount () {
        let location = await Location.getCurrentPositionAsync({  })

       // let location = JSON.stringify(loc)
        // console.log(loc.coords.longitude)
        console.log(location.coords.longitude)
        let lat = location.coords.latitude
        let lon = location.coords.longitude
        LatLng =  {
          latitude: lat,
          longitude: lon,
        }

    //    this.setState({ location })
        // let loc = Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        // let location = JSON.stringify(loc)
        // console.log(loc)
        // console.log(location)
        uid = firebase.auth().currentUser.uid
        const photo= this.props.navigation.getParam('photo') 
     //   const location= this.props.navigation.getParam('loc') 

    //    console.log(this.state.region.latitude)
    //    let location = await Location.getCurrentPositionAsync({});
      //  this.setState({ locationResult: JSON.stringify(location), location, });
        
        // console.log('first',this.state.location)
        // console.log('sec',this.state.locationResult)
        // console.log(this.state.locationResult)


        // //console.log(loc)
        // let location = JSON.stringify(loc);
        // console.log(location[4])

        // //console.log(location['Promise'])
        // //let minutesWriting = myObj['meta']['minutesWriting']
     
        weed = photo.width/photo.height
        this.setState({ 
          imageclick: photo.uri,
          lat,
          lon
      
         })

         
      }


      

      _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
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
                  {/* <Text> Loc: {this.state.loc}</Text> */}
                  {/* <MapView style={{ width:200, height:200 }} 
                //    region={this.state.location}
                  /> */}
{/* 

                  {console.log('first',this.state.location)}
                  {console.log('sec',this.state.locationResult)} */}
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.lat, longitude: this.state.lon, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
          //onRegionChange={this._handleMapRegionChange}
        >
        <Marker
      coordinate={LatLng}
      title="hi"
      description="dis"
    />
        </MapView>
        {/* <MapView
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"
          /> */}
               
                <Button onPress={() => this.submitButt() } ><Text>submit</Text></Button>
                </Block>
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
