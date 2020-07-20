import React from "react" 
import { Animated,Dimensions,View,StatusBar, Picker, Image, StyleSheet, LayoutAnimation, Alert,ToastAndroid,Modal } from "react-native" 
import { Button, Block, Text, Input, Divider } from "../../components" 
import { theme } from "../../constants" 
import Loader from '../Loader'
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage' 
import { utils } from '@react-native-firebase/app' 
import firebase from '../../firebase'
import Constants from 'expo-constants'
import MapView from 'react-native-maps' 
import { Marker } from 'react-native-maps' 
import * as Location from 'expo-location'
import AnimatedLoader from "react-native-animated-loader";
import axios from 'axios';
import fs from 'react-native-fs'
const { width, height } = Dimensions.get('screen') 
let Pincode
let link
var uid
let weed
let LatLng = {
  latitude: 37,
  longitude: -122,
}
let address
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
        date: null,
        loading: false,
        pass: false
    }
  }
  async componentDidMount () {
    this.setState({
      loading: true,
    }) 
    var today = new Date().toLocaleString()
    this.setState({date: today})
    
    let location = await Location.getCurrentPositionAsync({  })
    let lat = location.coords.latitude
    let lon = location.coords.longitude
    LatLng =  {
      latitude: lat,
      longitude: lon,
    }
    
 //   console.log(location.coords)
    let geocode = await Location.reverseGeocodeAsync(location.coords)
    //console.log('hi',geocode[0])
    address = geocode[0].name + ', ' + geocode[0].city + ', ' + geocode[0].region + ', ' + geocode[0].country + ', ' + geocode[0].postalCode + '.'
//    console.log(address)
    Pincode = geocode[0].postalCode
    uid = firebase.auth().currentUser.uid
    const photo= this.props.navigation.getParam('photo') 
    weed = photo.width/photo.height
    this.setState({ 
      imageclick: photo.uri,
      lat,
      lon
    })



    setTimeout(() => {
      this.setState({
        loading: false,
      }) 
    }, 2000) 


    // const axios = require('axios');



    // const config = {
    //     method: 'get',
    //     url: 'http://webcode.me',
    //     headers: { 'User-Agent': 'Console app' }
    // }

    // let res = await axios(config)

    // console.log(res.request._header);


    // const axios = require('axios')
 
    // axios.post('https://app.supervise.ly/public/api/v3/models.infer', {
    //   headers:{
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-API-KEY': 'my7vArRVZAN574hpYQBO35hUWf9pFPxFdsNv7CQ066nUayednUwImW940qBfRlXM4DJkJc21Wa4oG8UpRK3Ee7EkIvia3KTDQWzav5ErqwSOypxOMYjDOUphuMbzELBW'
    // },
    //     data:{
    //       id: 18517,
    //       data: '{}',
    //       image:  {
    //         name:'testImage.jpg',
    //         type: 'image/jpeg',
    //         rb:this.state.imageclick
    //       }
    //     }
       
    //   }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })

    // const axios = require('axios');

    // async function makeRequest() {
    
    //     const config = {
    //         method: 'get',
    //         url: 'http://webcode.me',
    //         headers: { 'User-Agent': 'Console app' }
    //     }
    
    //     let res = await axios(config)
    
    //     console.log(res.request._header);
    // }
    

    // const RNFS = require("react-native-fs")
     
    //  console.log(RNFS.readFile(this.state.imageclick, 'base64'))
    // RNFS.readFile(this.state.imageclick, "base64").then(data => {
    //   // binary data
    //   console.log(data);
    // });

    const axios = require('axios')

    //     const files= { 
    //        id: 18517,
    //       data: '{}',
    //       image: ('testImage.jpg','image/jpeg',this.state.imageclick)
    //       // image:  {
    //       //   name:'testImage.jpg',
    //       //   type: 'image/jpeg',
    //       //   rb:this.state.imageclick
    //       // }
    //     }
    //     const headers={
    //        //   Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'X-API-KEY': 'my7vArRVZAN574hpYQBO35hUWf9pFPxFdsNv7CQ066nUayednUwImW940qBfRlXM4DJkJc21Wa4oG8UpRK3Ee7EkIvia3KTDQWzav5ErqwSOypxOMYjDOUphuMbzELBW'
    //     }
    // // let res = await axios.post('https://app.supervise.ly/public/api/v3/models.infer', {headers}, files)
    // // console.log(res.data);
    // try {
    //   let res = await axios.post('https://app.supervise.ly/public/api/v3/models.infer/', {headers}, files)
    //   console.log(res);
    //   console.log(res.data);
    // } catch (error) {
    //   console.log(error);
    // }


    // const base64 = await fs.readFile(file.uri, 'base64')
    // const buffer = Buffer.from(base64, 'base64')


    axios.post('https://app.supervise.ly/public/api/v3/models.infer/', {
      id: 18517,
      data: '{}',
      image: ('testImage.jpg','image/jpeg',this.state.imageclick)
}, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'my7vArRVZAN574hpYQBO35hUWf9pFPxFdsNv7CQ066nUayednUwImW940qBfRlXM4DJkJc21Wa4oG8UpRK3Ee7EkIvia3KTDQWzav5ErqwSOypxOMYjDOUphuMbzELBW'

        }
})
.then(response => { 
	console.log('one'+response)
})
.catch(error => {
    console.log(error.response)
});






    // axios.post('https://app.supervise.ly/public/api/v3/models.infer', files, {headers})
    // .then(res=> {
    //   console.log(res)
    //   console.log(res.data)
    // })




    // const resp = await axios.post('https://app.supervise.ly/public/api/v3/models.infer', {
    //   // data to be sent
    //    data: { 
    //      id: 18517,
    //    data: '{}',
    //    image:  {
    //     name:'testImage.jpg',
    //     type: 'image/jpeg',
    //     rb:this.state.imageclick
    //    }}
    //   },
    //   { headers:{
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-API-KEY': 'my7vArRVZAN574hpYQBO35hUWf9pFPxFdsNv7CQ066nUayednUwImW940qBfRlXM4DJkJc21Wa4oG8UpRK3Ee7EkIvia3KTDQWzav5ErqwSOypxOMYjDOUphuMbzELBW'
    //    }}
    //   )
    //   console.log(resp.data)




      // .then(response => {
      //   if (response.data.status) {
      //    console.log(response);
      //  }
      // })
      // .catch((error) => {
      //   console.log(error)
      // })

    // axios.post('https://app.supervise.ly/public/api/v3/models.infer', {
    //   // data to be sent
    //     id: 18517,
    //    data: '{}',
    //    image:  {
    //     name:'testImage.jpg',
    //     type: 'image/jpeg',
    //     rb:this.state.imageclick
    //    }
    //   },
    //   { headers:{
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-API-KEY': 'my7vArRVZAN574hpYQBO35hUWf9pFPxFdsNv7CQ066nUayednUwImW940qBfRlXM4DJkJc21Wa4oG8UpRK3Ee7EkIvia3KTDQWzav5ErqwSOypxOMYjDOUphuMbzELBW'
    //    }}
    //   )
    //   .then(response => {
    //     if (response.data.status) {
    //      console.log(response);
    //    } 
    //   }).catch(error => {console.log(error)});


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
    if(this.state.type==undefined){
      Alert.alert('Select Type')
    }
    else{
      ToastAndroid.showWithGravityAndOffset( "Reporting...", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 )
     // console.log(this.state.type)
      var today = new Date() 
      const fileExtension = this.state.imageclick.split('.').pop() 
      const fileName = `${today}.${fileExtension}` 
      if(this.state.imageclick){
        this.setState({pass: true})

        await this.uploadImage(this.state.imageclick, fileName)
        .then(() => {
          Alert.alert('pushed to storage')
          let data ={
            email: firebase.auth().currentUser.email,
            code:Pincode,
            location:LatLng,
            date:this.state.date,
            photo:link,
            Type:this.state.type,
            Details:this.state.detail
          }
   //       console.log(data)
   //       console.log(this.state.date)
          firebase.database().ref('UserData/').push({ data }).then(() => console.log('Data set.'));
        })
        .catch((error) => {
          Alert.alert(error)
        })
      }
    } 
  }

  render() {
    LayoutAnimation.easeInEaseOut() 
    const item = this.state.imageclick
    return (
      <Block styles={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <StatusBar translucent={true} backgroundColor={'#0AC4BA'}/>
        <Loader loading={this.state.loading} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.pass}
        >
          <View style={{ flex: 1,
            backgroundColor:'rgba(0,0,0,0.65)',
            justifyContent: "center",
            alignItems: "center"}}>
            <View style={{margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5}}>
              <LottieView source={require('../../assets/tick.json')} autoPlay loop={false}
                style={{width:100,height:100}} />
              <Text h1 bold>Success!</Text>
              <Text body  style={{ textAlign: "center",margin:10}}>Your complaint will be registered.{'\n'}Thank you for helping make our city a better place.</Text>
              <Button color={theme.colors.primary}  style={{width:width*0.5,alignSelf:'center'}} onPress={() => this.props.navigation.navigate('App')}>
                <Text center bold>Back to Home</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Block row style={{  marginTop:Constants.statusBarHeight, }}>
          <Block column center
            style={{ 
              marginVertical:Constants.statusBarHeight, 
              position:'relative',
              width:width, 
              height:height, 
              paddingHorizontal:50 
            }}>
            <View  style={{width:width*0.9,height:height*0.25,alignItems:'center'}}>
              <Image 
                style={{ 
                  aspectRatio: weed, 
                  width: '100%', 
                  height: '100%', 
                // paddingHorizontal:30,
                  borderRadius:5,
                  borderWidth:1,
                  borderColor: theme.colors.primary,
                }} 
                source={{ uri: item }} />
            </View>
            <View style={{width:width*0.9,height:1,backgroundColor:'#808088',marginVertical:10}}/>
            <View style={{flexDirection: 'row', alignItems: 'center',width:width*0.8}}>
              <Text black bold h2>Type:</Text>
              <Picker
                selectedValue={this.state.type}
                style={{ height: 50, width: 200, backgroundColor:'#fff' ,
                  color:theme.colors.secondary
                }}
                onValueChange={type => this.setState({ type })}
              >
                <Picker.MODE_DIALOG label="Select type" />
                <Picker.Item label="Garbage" value="Garbage" />
                <Picker.Item label="Potholes" value="Potholes" />
                <Picker.Item label="Dead Animals" value="Animals" />
              </Picker>
            </View>

            <View style={{width:width*0.9,height:1,backgroundColor:'#808088',marginVertical:10}}/>
            <View style={{width:width*0.8}} >
            <Text bold black>Details (Optional)</Text> 
              <Input
                multiline={true}
                style={[styles.input]}
          
                numberOfLines={4}
                onChangeText={(detail) => this.setState({detail})}
                value={this.state.detail}/>

            </View>
            <View style={{width:width*0.9,height:1,backgroundColor:'#808088',marginBottom:10}}/>

           {/* <Card style={{borderColor:'grey',width:width*0.9,borderWidth:1}}>
            */}
            <View style={{width:width*0.8}}>
           <Text bold h3 black>Location:</Text>
            <View style={{ width:width*0.8, marginTop:5, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{ borderColor:theme.colors.primary, borderWidth:1,}}>
                <MapView
                  style={{ alignSelf: 'center', height: height*0.2,width:width*0.45,
                 // left:0,bottom:0,margin:0,position:'absolute' 
                }}
                  region={{ latitude: this.state.lat, longitude: this.state.lon, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
                >
                  <Marker
                    coordinate={LatLng}
                    title="Your Location"
                  //  description=""
                  />
                </MapView>
                </View>
                <Text bold secondary center style={{width:width*0.35,marginLeft:10}}>{address}</Text>
              </View>
                </View>



                {/* </Card> */}
             {/*file upload delay
             select type required before pushing to database*/}
                <Block row middle >
                <Button gradient style={{width:width*0.5,marginVertical:20}} onPress={() => this.submitButt() } >
                  <Text center h3 bold black>Submit</Text>
                  </Button>
                {/* <Button onPress={() =>this.props.navigation.navigate('App')} ><Text>back</Text></Button> */}
                </Block>
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
    width:width*0.8, 
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalView: {
    width:width*0.8,
    height:height*0.7,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
   
  }
 
}) 
