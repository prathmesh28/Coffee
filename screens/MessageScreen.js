import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Firebase from "../firebase";
export default class MessageScreen extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: "new"
    //       }
    //     }
    
componentDidMount() { 
    // Firebase.database()
    //   .ref("UsersList/" )
    //   .once("value", (snapshot) => {
    //       console.log('h')
    //     //   console.log(snapshot.val())
    //     // snapshot.val().map((element) => {
    //     //         console.log(element)
    //     // })
    //     const item = Object.keys(snapshot.val()).map(function(key, index) {
    //    //     this.state.data.push(snapshot.val()[key].data);
    //      let Data = snapshot.val()[key].data
    //     // console.log(Data)
    //      return Data
            
    //      //   this.state.data.push(Data);
    //       });
    //       console.log(item[0])

    //   })



    // Firebase.database()
    //   .ref("UsersList/" + uid + "/data/")
    //   .once("value", (snapshot) => {
    //       console.log('h')
    //       console.log(snapshot.val())
        
        // snapshot.val().map((element) => {
        //     console.log(element)
        //     // if (element.selected) {
        //     //   const temp = element.name
        //     //     return temp
        //     // }
        //    })
        // })
}



    render() {
        return (
            <View style={styles.container}>
                <Text> Past reports</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
