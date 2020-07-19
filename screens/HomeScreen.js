import React from "react"  
import { View, LayoutAnimation, Dimensions, TouchableOpacity, StatusBar } from "react-native"  
import Constants from 'expo-constants'
import { Card, Title } from 'react-native-paper'  
import { MaterialIcons } from '@expo/vector-icons'   
import Firebase from '../firebase'  
import { Text, Button } from "../components" 
import { theme } from "../constants" 
const { height, width } = Dimensions.get('screen')  
import LottieView from 'lottie-react-native';

export default class HomeScreen extends React.Component {
    state = { email: "", displayName: "" }  
    componentDidMount() {
        const { email, displayName } = Firebase.auth().currentUser  
        this.setState({ email, displayName })  
        
    }
    render() {
        LayoutAnimation.easeInEaseOut()  
        return (
            <View >
                <StatusBar translucent={true}  backgroundColor={'#0AC4BA'} />

                <View   style={{width:width, marginVertical:Constants.statusBarHeight}}>

                    <Button gradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
                        startColor={theme.colors.primary} endColor={'transparent'} 
                        style={{borderRadius:0,marginVertical:0,height:Constants.statusBarHeight}}>
                    </Button>
                    <Text center bold h2 style={{marginVertical:10}}>Tap the button to start reporting.</Text>
                    <Card style={{marginTop:40, backgroundColor:'rgba(10,196,186,0.1)',borderRadius:5,elevation:0, width:width*0.8,alignSelf:"center",justifyContent:"center", alignItems:"center"}}>
                        <Card.Content>
                            <TouchableOpacity style={{alignSelf:"center",alignItems:"center"}}
                                onPress={() =>this.props.navigation.navigate('Submit')}>
                                <MaterialIcons name="location-searching" size={44} color="black" />
                                <Title>Report</Title>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card> 
                    {/* <View style={{backgroundColor:'#fff',
                        width:400,height:400,alignSelf:"center",justifyContent:"center", alignItems:"center",
                        }}>
                            <LottieView source={require('../assets/home.json')} autoPlay 
                            //loop={false}
                        style={{width:100,height:100}} />
                    </View> */}
                    {/* <View style={{marginTop:300, backgroundColor:'rgba(10,196,186,0.1)', padding:10,
                        width:width*0.8,alignSelf:"center",justifyContent:"center", alignItems:"center",
                        }}>      
                        <Text style={{fontStyle:'italic'}} center h3 secondary>Progress is impossible without change, and those who cannot change their minds cannot change anything.</Text>       
                    </View>  */}
                </View>
            </View>
        )
    }
}
 
