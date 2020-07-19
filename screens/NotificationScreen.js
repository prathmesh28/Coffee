import React from "react"
import { View, Text, StyleSheet,StatusBar, Dimensions } from "react-native"
import MapView from 'react-native-maps' 
import { Marker } from 'react-native-maps' 
import Firebase from '../firebase'
import _ from 'lodash'
import { theme } from "../constants" 
const { width, height } = Dimensions.get('screen') 
import * as Location from 'expo-location'
import { HeaderHeightContext } from "react-navigation-stack"

export default class NotificationScreen extends React.Component {
    state = {
        data:null,
        lat:null,
        lon:null,
    }
    async componentDidMount() {

        let location = await Location.getCurrentPositionAsync({  })
        let lat = location.coords.latitude
        let lon = location.coords.longitude
        this.setState({lat, lon})
       
        Firebase.database()
        .ref("UserData/")
        .on("value", (snapshot) => {
            
            const friends = _.map(snapshot.val(), (itm) => {
                return itm.data
            })
            this.setState({data:friends})
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar  backgroundColor={theme.colors.primary}/>
                <MapView
                  style={{ alignSelf: 'center',
                    height: height,width:width,
                    }}
                  region={{ latitude: this.state.lat, longitude: this.state.lon, latitudeDelta: 0.4, longitudeDelta:0.4 }}
                >
                    {_.map(this.state.data, (mark) => {return(  
                        <Marker
                            coordinate={{longitude: mark.location.longitude, latitude: mark.location.latitude}}
                            title={mark.Type==='Animals'?'Dead Animals':mark.Type}
                            description={mark.Details}
                        ></Marker> )
                    })}
                  
                </MapView>
             
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
