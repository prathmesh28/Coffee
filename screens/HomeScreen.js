import React from "react";
import { StyleSheet, LayoutAnimation } from "react-native";
import { Block, theme } from 'galio-framework'
import { Avatar,Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import Firebase from '../firebase';
export default class HomeScreen extends React.Component {
    state = { email: "", displayName: "" };
    componentDidMount() {
        const { email, displayName } = Firebase.auth().currentUser;
        this.setState({ email, displayName });
    }
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <Block flex>
                

                <Card style={{
                    marginTop:100,
                    alignSelf:'center',
                    width:200,
                    }}
                    onPress={() =>this.props.navigation.navigate('Submit')}
                     >
                    <Card.Content style={{backgroundColor:'#32CD32', borderRadius:10}}>
                    <Button icon="camera" color={'black'}>
                        Report
                    </Button>
                    </Card.Content>
                </Card>  
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
