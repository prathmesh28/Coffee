import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { FormLabel, FormInput, FormValidationMessage,Form } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Firebase from '../firebase';
//export const firestore = Firebase.firestore()
export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor() {
        super();
        this.dbRef = Firebase.firestore().collection('users');
        this.state = {
            name: "", email: "", phone: "", password: "", errorMessage: null 
        };
      }
      inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      storeUser() {
               
          this.dbRef.add({
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
          }).then((res) => {
            this.setState({
              name: '',
              email: '',
              phone: '',
            });
            this.props.navigation.navigate('App')
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
        
      }
    
    handleRegisterUser = () => {    
        Firebase
        .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
        };
            //.auth()
            //.createUserWithEmailAndPassword(email, password)
            //.then((user) => {
                
                   // userCredentials.user.updateProfile({name});
                
                    // const fbRootRefFS = Firebase.firestore();
                    // const userID = user.uid;
                    // console.log('user id ', userID);
                    // console.log(name);
                    // const userRef= fbRootRefFS.collection('users').doc(userID);
                    // userRef.set({
                    //     name,
                    //     email,
                    //     phone
                    // });
                
            //})
            //.catch(error => this.setState({ errorMessage: error.message }))

    // updateInput = e => {
    //     this.setState({
    //       [e.target.name]: e.target.value,
    //       [e.target.email]: e.target.value,
    //       [e.target.phone]: e.target.value,
    //       [e.target.password]: e.target.value
    //     });
    //   }
    // addUser = e => {
    //     e.preventDefault();
    //     const db = firebase.firestore();
    //     db.settings({
    //       timestampsInSnapshots: true
    //     });
    //     const userRef = db.collection("users").add({
    //       name: this.state.name,
    //       email: this.state.email
    //     });  
    //     this.setState({
    //       fullname: "",
    //       email: ""
    //     });
    //   };
    // handleGoBack = () => {

    // }
    // handleSetNameLocalState=(name)=>{
        
    //     this.setState({
    //         name,
    //     });
    // }
    // handleSetEmailLocalState=(email)=>{
    //     this.setState({
    //         email,
    //     });

    // }
    // handleSetPhoneLocalState=(phone)=>{
    //     this.setState({
    //         phone,
    //     });

    // }
    // handleSetPasswordLocalState=(password)=>{
    //     this.setState({
    //         password,
    //     });

    // }

    //working
    // componentWillMount(){
    //     Firebase.database().ref('Users/002').set({
    //         name: 'qwert',
    //         phone: '12345678',
    //         email: 'qwert@sdf.hjj'
    //     }).then((data)=>{
    //         //success callback
    //         console.log('data ' , data)
    //     }).catch((error)=>{
    //         //error callback
    //         console.log('error ' , error)
    //     })
    // }


    // writeUserData(name, email,phone){
    //     Firebase.database().ref('Users/').push({
    //         name,
    //         phone,
    //         email
    //     }).then((data)=>{
    //         //success callback
    //         console.log('data ' , data)
    //     }).catch((error)=>{
    //         //error callback
    //         console.log('error ' , error)
    //     })
    // }

    // handleText=e=>{
    //     this.setState({
    //         name:e.target.value
    //     })
    // }
    // handleSubmit=e=>{
    //     let uname=Firebase.database().ref('name').orderByKey().limitToLast(100);
    //     firebase.database().ref('name').push(this.state.name);
    //     this.setState({
    //         name:""
    //     })
    // }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                
                <Image
                    source={require("../assets/grass.png")}
                    style={{ position: "absolute", bottom: -10}}
                ></Image>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity>
                <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
                    <TouchableOpacity style={styles.avatar}>
                    
                        <Ionicons
                            name="md-person"
                            size={40}
                        ></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                
                    <View>
                     <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Mobile No.</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(val) => this.inputValueUpdate(val, 'phone')}
                            value={this.state.phone}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={(val) => this.inputValueUpdate(val, 'password')}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                    
                </View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => this.storeUser()}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 17 }}>
                        Already have an account? <Text style={{ fontWeight: "600", color: "#005ce6" }}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );   
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#000"
    },
    form: {
      
        marginTop:230,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#00b33c",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    }
});
