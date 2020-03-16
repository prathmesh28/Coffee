import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
      };
    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button} >
                    <Text>Capture</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 4,
        height: 52,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    }
 
});
