import React, { Component } from "react" 
import { Ionicons } from '@expo/vector-icons'  
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  AsyncStorage,
  TouchableOpacity
} from "react-native" 
import Constants from 'expo-constants'
import Firebase from '../firebase' 
import { Button, Block, Input, Text } from "../components" 
import { theme } from "../constants" 
const { height, width } = Dimensions.get('screen') 
import Loader from './Loader'
export default class SignUp extends Component {
  static navigationOptions = {
    headerShown: false
  }

  state = { name: "", email: "", password: "", check: false, errorMessage: null, loading: false } 
  
  handleSignUp = () => {
    this.setState({
      loading: true
    })
    let name=this.state.name
    let email=this.state.email
    
      Firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(userCredentials => {
            userCredentials.user.updateProfile({displayName: this.state.name}) 
            Firebase.database().ref('UsersList/' + userCredentials.user.uid).set({
                name,
                email,
            }).then((data)=>{          
            setTimeout(() => {
              this.setState({
                loading: false,
              }) 
            }, 2500) 
            
            }).catch((error)=>{
              this.setState({
                loading: false,
              }) 
            })
          })
          .catch(error => this.setState({ errorMessage: error.message })) 
    AsyncStorage.setItem('email', this.state.email, () => {
    })
    
  } 
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Block  style={{...styles.signup,marginTop:Constants.statusBarHeight}} >
      <StatusBar translucent={true} backgroundColor={'#0AC4BA'}/>
        <Loader loading={this.state.loading} />
        <Block shadow style={{ top:7,width:width, position:'absolute',}}>
          <Ionicons style={{margin:20}}  name="ios-arrow-back" size={24} color="black" onPress={() =>this.props.navigation.navigate('Start')} />
          <Button  style={{width:80,margin:10,right:5,position:'absolute'}}  onPress={() =>this.props.navigation.navigate('Login')}>
            <Text bold center >
              Sign In
            </Text>
          </Button>
        </Block>

        <Block middle style={{ top:70,width:width*0.85, position:'absolute', alignSelf:'center',height:height*0.85}}>
          <Block middle flex={0.1}>
            <Text h1 bold>
                Sign Up.
            </Text>
          </Block>
          
          <Block flex={0.1} style={styles.errorMessage}>
                    {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
            </Block>
          <Block flex={0.5}>
            <Input
              onChangeText={name => this.setState({ name })}
              label="Full Name"
              style={[styles.input]}
              defaultValue={this.state.name}
            />
            <Input
              email
              onChangeText={email => this.setState({ email })}
              label="Email"
              style={[styles.input]}
              defaultValue={this.state.email}
            />
            <Input
              secure
              label="Password"
              onChangeText={password => this.setState({ password })}
              style={[styles.input]}
              defaultValue={this.state.password}
            />
            <Button shadow gradient onPress={() => this.handleSignUp()}>
                <Text bold center >
                  Sign Up
                </Text>
            </Button>
          </Block>

          <Block style={{marginTop:20}} flex={0.2}>
            <TouchableOpacity  onPress={() =>this.props.navigation.navigate('Login')} style={{margin:30}}>
              <Text center  caption spacing={0.7}>Already have an Account 
                <Text primary>
                  {" "}
                  Sign In.
                </Text>
              </Text>
            </TouchableOpacity>
            <View
              style={{
              margin:10,
                borderBottomColor: '#808088',
                borderBottomWidth: 0.7,
              }}
            />
            <Text center gray caption>OR Sign up with</Text>
          </Block>
          <Block flex={0.15} style={{ margin:20}}>
            <Button center style={{ backgroundColor: "#db4a39", width:width*0.3, position:'absolute',left:10 }} >
              <Text  bold center style={{ color: "white" }}>
                <Ionicons
                    name="logo-google"
                    size={14}
                    color={"white"}/>
                {"  "}GOOGLE</Text>
            </Button>
            <Button center style={{  backgroundColor: "#3b5998", width:width*0.3, position:'absolute', right:10 }} >
              <Text  bold center style={{ color: "white" }}>
                <Ionicons
                  name="logo-facebook"
                  size={14}
                  color={"white"}/>
                  {"  "}FACEBOOK</Text>
            </Button>
          </Block>
        </Block>  
      </Block>
    </SafeAreaView>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signup: {
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  errorMessage: {
    height: 20,
 },
 error: {
   color: '#E9446A',
   fontSize: 13,
   fontWeight: '600',
   textAlign: 'center',
 },
}) 