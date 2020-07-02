import React from "react";
import { StyleSheet, LayoutAnimation, Dimensions, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import { Block, theme } from 'galio-framework'
import { Avatar,Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 
import Firebase from '../firebase';
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
            <Block flex>
                <StatusBar translucent={true}  backgroundColor={'transparent'} />

                <ImageBackground source={image} style={{ flex: 1, resizeMode: "cover",}}>
    
                <Card style={{marginTop:100, width:width*0.8,alignSelf:"center",justifyContent:"center", alignItems:"center"}}>
                    <Card.Content>
                   <TouchableOpacity style={{alignSelf:"center",alignItems:"center"}}
                    onPress={() =>this.props.navigation.navigate('Submit')}>
                    <MaterialIcons name="location-searching" size={44} color="black" />
                <Title>Report</Title>
                </TouchableOpacity>
                    </Card.Content>
                </Card> 

                </ImageBackground>
                </Block>
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
