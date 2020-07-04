import React from "react";
import { View, StyleSheet, LayoutAnimation, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import Constants from 'expo-constants'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 
import Firebase from '../firebase';
import { Text, Button } from "../components" 
import { theme } from "../constants" 

const { height, width } = Dimensions.get('screen')  
const image =  require("../assets/backgrenn.jpg") 

export default class HomeScreen extends React.Component {
    state = { email: "", displayName: "" };
    componentDidMount() {
        const { email, displayName } = Firebase.auth().currentUser;
        this.setState({ email, displayName });
        
    }
    //marginTop:Constants.statusBarHeight
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View >
                <StatusBar translucent={true}  backgroundColor={'#0AC4BA'} />
                <View   style={{width:width, marginVertical:Constants.statusBarHeight}}>
                <Button gradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
                  startColor={theme.colors.primary} endColor={'#fff'} style={{borderRadius:0,marginVertical:0,height:Constants.statusBarHeight}}>
                 </Button>
                {/* <ImageBackground source={image} style={{ flex: 1, resizeMode: "cover",}}> */}
    
                <Card style={{marginTop:100, backgroundColor:'#f7fcf8',borderRadius:4, width:width*0.8,alignSelf:"center",justifyContent:"center", alignItems:"center"}}>
                    <Card.Content>
                   <TouchableOpacity style={{alignSelf:"center",alignItems:"center"}}
                    onPress={() =>this.props.navigation.navigate('Submit')}>
                    <MaterialIcons name="location-searching" size={44} color="black" />
                <Title>Report</Title>
                </TouchableOpacity>
                    </Card.Content>
                </Card> 
</View>
                {/* </ImageBackground> */}
                </View>
        );
    }
}

const styles = StyleSheet.create({
   
    button: {
        top: 100,
        marginHorizontal: 30,
        backgroundColor: "grey",
        borderRadius: 4,
        height: 52,
        width: 100,
    }
});
