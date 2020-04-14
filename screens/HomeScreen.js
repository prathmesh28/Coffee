import React from "react";
import { StyleSheet, LayoutAnimation } from "react-native";
import { Block, Button, Text, theme } from 'galio-framework'
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
                <Block center>
                    <Button
                        textStyle={{ fontSize: 20 }}
                        style={styles.button}
                        onPress={() =>this.props.navigation.navigate('Report')}
                        >
                        Camera
                    </Button>
                </Block>
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
