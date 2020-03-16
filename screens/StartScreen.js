import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

export default class StartScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
      };
    
   
 
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.button1} 
                    onPress={() =>this.props.navigation.navigate('Login')}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Log In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button2} 
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button3} 
                    onPress={this.handleLogin}>
                    <Text style={{ color: '#FFF', fontWeight: '500' }}>
                        Sign Up with google
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

// const AuthStack = createStackNavigator({
//     Start:StartScreen,
//     Login: LoginScreen,
//     Register: RegisterScreen
// });
// export default class App extends Component{
//     render(){
//         return(
//             <AuthStack/>
//         );
//     }
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button1: {
        width: 200,
        marginTop:10,
        marginHorizontal: 30,
        backgroundColor: '#005ce6',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button2: {
        width: 200,
        marginTop:10,
        marginHorizontal: 30,
        backgroundColor: '#005ce6',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button3: {
        width: 200,
        marginTop:10,
        marginHorizontal: 30,
        backgroundColor: '#005ce6',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
      }
});
