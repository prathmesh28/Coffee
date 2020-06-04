import React from "react" 
import { Animated,Dimensions,View,TextInput, Picker, Image, StyleSheet, LayoutAnimation, Alert,ToastAndroid } from "react-native" 

import { Button, Block, Text, Input } from "../../components" 
import { theme } from "../../constants" 

import storage from '@react-native-firebase/storage' 
import { utils } from '@react-native-firebase/app' 
import firebase from '../../firebase'
import Constants from 'expo-constants'
//import MapView from 'expo' 
import MapView from 'react-native-maps' 
import { Marker } from 'react-native-maps' 
import * as Location from 'expo-location'
const { width, height } = Dimensions.get('screen') 

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
  } 

  constructor(props) {
    super(props)
    this.state = {
        imageclick: null,   
        lat:null,
        lon:null,
        uploaded:false,
        type: null,
        detail:'',
        data: [],
   
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
        let geocode = await Location.reverseGeocodeAsync(location.coords)
        console.log('hi',geocode[0].postalCode)
        Pincode = geocode[0].postalCode
        uid = firebase.auth().currentUser.uid
        const photo= this.props.navigation.getParam('photo') 
     //   console.log(photo)
        weed = photo.width/photo.height
        this.setState({ 
          imageclick: photo.uri,
          lat,
          lon
         })
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


      


  submitButt = async () => {
    // if(this.state.type==undefined){
    //   Alert.alert('Select Type')
    // }
    // else{
       // ToastAndroid.showWithGravityAndOffset(
    //   "Reporting...",
    //   ToastAndroid.LONG,
    //   ToastAndroid.BOTTOM,
    //   25,
    //   50
    // )
    //console.log(this.state.type)
    
    var today = new Date() 
    const fileExtension = this.state.imageclick.split('.').pop() 
    const fileName = `${today}.${fileExtension}` 
    // if(this.state.imageclick){
    //   await this.uploadImage(this.state.imageclick, fileName)
    //   .then(() => {
    //     Alert.alert('pushed to storage')
        const data ={
          code:Pincode,
          location:LatLng,
          photo:link,
          Type:this.state.type,
          Details:this.state.detail
        }
       
        firebase.database()
          .ref("UsersList/" + uid + "/data/")
          .once("value", (snapshot) => {
           
            console.log(snapshot.val())
            if(snapshot.val()=== ''){
              console.log('ASDFGHJK')
              this.setState({ data: data });
            }else{
              console.log('hello')
              
              this.setState({ data: snapshot.val() });
           //   this.state.data.push(data);
            }
           
          //  console.log(this.state.data)
            console.log('hi')

        // firebase.database()
        // .ref('UsersList/' + uid )
        // .update({
        //   data:this.state.data
        // }).then(() => {
        //   this.props.navigation.navigate('App')
         
        //  })

      })

      // })
    //   .catch((error) => {
    //     Alert.alert(error)
    //   })
    // }

    // } 
 }



    render() {
        LayoutAnimation.easeInEaseOut() 
        const item = this.state.imageclick
        return (
            <Block row >
                <Block column center
                  style={{ 
                    marginVertical:Constants.statusBarHeight, 
                    position:'relative',
                    width:width, 
                    height:height, 
                    paddingHorizontal:50 
                  }}>
                  <Block row center middle>
                    <Image 
                      style={{ 
                        aspectRatio: weed, 
                        width: '50%', 
                        height: undefined, 
                      // paddingHorizontal:30,
                        borderRadius:5,
                        borderWidth:2,
                        borderColor: theme.colors.gray2,
                      }} 
                      source={{ uri: item }} />
                  </Block>

                  <Block row middle center  
                    //style={{marginVertical:50}}
                    >
                    <Text  bold h2>Type:</Text>
                    <Picker
                      selectedValue={this.state.type}
                      style={{ height: 50, width: 150 }}
                      onValueChange={type => this.setState({ type })}
                    >
                      <Picker.MODE_DIALOG label="Select type" />
                      <Picker.Item label="Garbage" value="Garbage" />
                      <Picker.Item label="Potholes" value="Potholes" />
                      <Picker.Item label="Dead Animals" value="Animals" />
                    </Picker>
                  </Block>

                  <Block row >
                    <Input
                      label={'Details (Optional)'}
                      multiline={true}
                      style={[styles.input]}
                     
                      numberOfLines={4}
                      onChangeText={(detail) => this.setState({detail})}
                      value={this.state.detail}/>

                  </Block>
{/* 
                  <Block row 
                    style={{
                      height:1,
                      width:width*0.8,
                      borderBottomColor: '#b1b1b1',
                      borderBottomWidth: 1,
                    }}
                  /> */}

           
                <MapView
                  style={{ alignSelf: 'center', height: height*0.2,width:width*0.5 }}
                  region={{ latitude: this.state.lat, longitude: this.state.lon, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                >
                  <Marker
                    coordinate={LatLng}
                    title="Your Location"
                  //  description=""
                  />
                </MapView>
             {/*file upload delay
             select type required before pushing to database*/}
                <Block row middle >
                <Button gradient style={{width:width*0.5,marginVertical:20}} onPress={() => this.submitButt() } >
                  <Text center semibold>submit</Text>
                  </Button>
                <Button onPress={() =>this.props.navigation.navigate('App')} ><Text>back</Text></Button>
                </Block>
                </Block>
            </Block>
        ) 
    }
}

const styles = StyleSheet.create({
  input: {
    marginVertical:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    height: height*0.1,
    width:width*0.6, 
  },
    // button: {
    //     top: 100,
    //     marginHorizontal: 30,
    //     backgroundColor: "grey",
    //     borderRadius: 4,
    //     height: 52,
    //     width: 100,
    // }
}) 
