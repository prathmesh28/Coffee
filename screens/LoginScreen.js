import React, { Component } from "react"  
import { Ionicons } from '@expo/vector-icons'   
import Modal from 'react-native-modal'  
import { LinearGradient } from 'expo-linear-gradient'
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native"  
import { Button, Block, Input, Text } from "../components"  
import { theme } from "../constants"  
const { height, width } = Dimensions.get('screen')  
import Firebase from '../firebase'
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false
  }

  state = {
    email: '',
    password: '',
    errorMessage: null,
    loading: false,
    pass: false
  }  

  componentDidMount () { 
    AsyncStorage.getItem('email').then((value) => this.setState({ 'email': value })) 
  }

  toggleModal = () => {
    this.setState({pass: true})  
  }  

  handlePasswordReset = async (values, actions) => {
    const { email } = this.state  
    try {
      Firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
    }
    this.setState({passs: false})  
  }

  handleLogin = () => {
    const { email, password } = this.state  

    Firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }))  
    AsyncStorage.setItem('email', email)  
  }  

  render() {
   
    return (
    <SafeAreaView style={styles.container}>
      <Block  style={styles.signup} >
        <StatusBar  />
        <Modal isVisible={this.state.pass} onBackdropPress={() => this.setState({pass: false})}>
          <View  style={styles.activityIndicatorWrapper} >
         
           
         
                <Text bold title>
                  Reset Password
                </Text>
                <Input
                  email
                  onChangeText={email => this.setState({ email })}
                  defaultValue={this.state.email}
                  placeholder=' Enter email'
                  style={{width:width*0.5,padding:1}}
                />
                <TouchableOpacity  onPress={this.handlePasswordReset}>
           
                  <Text primary h2 bold>Send Email</Text>
                </TouchableOpacity>
              
              </View>
            </Modal>
        <Block  style={{ top:7,width:width, position:'absolute',}}>
          <Ionicons style={{margin:20}}  name="ios-arrow-back" size={24} color="black" onPress={() =>this.props.navigation.navigate('Start')} />
          <Button shadow style={{width:80,margin:10,right:5,position:'absolute'}}  onPress={() =>this.props.navigation.navigate('Register')}>
                    <Text bold center >
                      Sign Up
                    </Text>
          </Button>
          
        </Block>
      
        <Block middle style={{ top:70,width:width*0.85, position:'absolute', alignSelf:'center',height:height*0.85}}>

            <Block middle flex={0.2}>
                <Text h1 bold>
                    Sign In
                </Text>
            </Block>
        
          <Block flex={0.1} style={styles.errorMessage}>
                  {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
          </Block>
            <Block flex={0.5}>
                <Input
                  email
                  label="Email"
                  style={[styles.input]}
                  onChangeText={email => this.setState({ email })}
                  defaultValue={this.state.email}
                />
                <Input
                  secure
                  label="Password"
                  style={[styles.input]}
                  onChangeText={password => this.setState({ password })}
                  defaultValue={this.state.password}
                />
                <Button gradient onPress={() => this.handleLogin()}>
                    <Text bold center >
                      Sign In
                    </Text>
                </Button>
                
            </Block>
            <Block flex={0.2}>
              <TouchableOpacity onPress={this.toggleModal}  >
                <Text bold primary spacing={0.7} style={{textDecorationLine: 'underline'}}>Forget Password ?</Text>
              </TouchableOpacity>
            </Block>
            
          
        </Block>
        
    </Block>
     
      </SafeAreaView>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  signup: {
    justifyContent: "center",
  },
  input: {
    marginVertical:10,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height:height*0.3,
    width: width*0.8,
     borderRadius: 10,
    // display: "flex",
     alignItems: "center",
     alignSelf:"center",
     justifyContent: "space-around",
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
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
})  