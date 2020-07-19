import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import LoadingScreen from "./screens/LoadingScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import MessageScreen from "./screens/MessageScreen"
import NotificationScreen from "./screens/NotificationScreen"
import ProfileScreen from "./screens/ProfileScreen"
import StartScreen from "./screens/StartScreen"

import CameraScreen from "./screens/Camera/CameraScreen"
import DisplayScreen from './screens/Camera/DisplayScreen'

// function cacheImages(images) {
//     return images.map(image => {
//       if (typeof image === 'string') {
//         return Image.prefetch(image);
//       } else {
//         return Asset.fromModule(image).downloadAsync();
//       }
//     });
//  }
const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={30} color={tintColor} />
            }
        },
        History: {
            screen: MessageScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <FontAwesome name="history" size={30} color={tintColor} />
            }
        },
        Dumps: {
            screen: NotificationScreen,
            navigationOptions: {
             tabBarIcon: ({ tintColor }) => <Fontisto name="world" size={30} color={tintColor} />
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={30} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
          
            activeTintColor: "#0AC4BA",
            inactiveTintColor: "#8d9096",
            style:{height:60,paddingVertical:10}
            
            //showLabel: false,
            
        }
    }
) 

const AuthStack = createStackNavigator({
    Start:StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen
}) 
// const SubmitStack = createStackNavigator({
//     cam:CameraScreen,
// })
// const DoneStack = createStackNavigator({ 
//     done:DisplayScreen
// }) 

const Container = createAppContainer(

    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Auth: AuthStack,
            App: AppTabNavigator,
            Submit:CameraScreen,
            Show:DisplayScreen
            
        },
        {
            initialRouteName: "Loading"
        }
    )
) 
class App extends React.Component {
    constructor() {
        super();
        this.state = {
          isReady: false
        };
      }
    async _loadAssetsAsync() {
      //if images taking time to load use this
        // const imageAssets = cacheImages([require('./assets/login.jpg')])
    
        // await Promise.all([...imageAssets]);
      }
    render() {
        if (!this.state.isReady) {
            return (
              <AppLoading
                startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
              />
            );
          }
          return <Container/>

    }
  }
  
  export default App