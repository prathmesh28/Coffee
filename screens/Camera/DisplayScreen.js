import React from "react";
import { Dimensions,View, Image, StyleSheet, LayoutAnimation, Alert,ToastAndroid } from "react-native";
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

let Pincode
let link
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
        lon:-122,
        uploaded:false,
        data:null
      }
    }
    async componentDidMount () {
     
        let location = await Location.getCurrentPositionAsync({  })
        let lat = location.coords.latitude
        let lon = location.coords.longitude
        LatLng =  {
          latitude: lat,
          longitude: lon,
        }
        let geocode = await Location.reverseGeocodeAsync(location.coords); 
        // this.setState({ 
        //   //this.state.data.Pincode: '234'
        //  })

      //  console.log(this.state.data.location)
        console.log('hi',geocode[0].postalCode)
        Pincode = geocode[0].postalCode
        uid = firebase.auth().currentUser.uid
        const photo= this.props.navigation.getParam('photo') 
        console.log(photo)
        weed = photo.width/photo.height
        this.setState({ 
          imageclick: photo.uri,
          lat,
          lon
         })

         var today = new Date();
         const fileExtension = this.state.imageclick.split('.').pop();
         const fileName = `${today}.${fileExtension}`;
          if(this.state.imageclick){
            this.uploadImage(this.state.imageclick, fileName)
            .then(() => {
              Alert.alert('pushed to storage')
           //   this.setState({ uploaded:true})

            })
            .catch((error) => {
              Alert.alert(error)
            })
          }
      }

      uploadImage = async (uri, imageName) => {
        const responce = await fetch(uri)
        const blob =await responce.blob()
        var ref = firebase.storage().ref().child(uid+ '/' + imageName)
        await this.uplodimg(ref, blob)
        link = await this.getlink(ref)
       // this.setState({ imageclick: link })
        console.log(link)
      } 
      uplodimg = async ( ref, blob) => {
        return ref.put(blob).then( () =>{
          console.log('updated')
        })
      }
      getlink = async ( ref ) => {

       return ref.getDownloadURL()
      

      }


      

      _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
      };

  submitButt = async () => {
    ToastAndroid.showWithGravityAndOffset(
      "Reporting...",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    )
           console.log(Pincode)
           console.log(LatLng)
           console.log(link)

           const data ={
             code:Pincode,
             location:LatLng,
             photo:link
           }
      console.log(data)
    firebase.database()
      .ref('UsersList/' + uid + '/data/')
      .push({
        data
      })
      console.log('done')
    
      
 }



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
                <Button onPress={() =>this.props.navigation.navigate('App')} ><Text>back</Text></Button>

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
