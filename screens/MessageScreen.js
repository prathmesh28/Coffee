import React from "react";
import { Text, View, StyleSheet,StatusBar, FlatList, Dimensions, Image } from "react-native";
import Firebase from "../firebase"
import {  Card, Colors, Title, ToggleButton, Paragraph, Button } from "react-native-paper";
const { width, height } = Dimensions.get('screen') 
import Constants from 'expo-constants'

let date
import TimeAgo from 'react-native-timeago';
let timestamp = "2015-06-21T06:24:44.124Z";
var today
export default class MessageScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          Data: null
        }
      }
     
    
// componentDidMount() { 
//   today = new Date() 
//   console.log(today)
//   // let Date = new date()
//   // timestamp = Date.now()
//   // console.log(timestamp)
//     let email = Firebase.auth().currentUser.email
//     Firebase.database()
//       .ref("UserData/")
//       .once("value", (snapshot) => {
 
//         const FilterData = Object.keys(snapshot.val()).map(function(key, index) {
//             if(snapshot.val()[key].data.email === email){
//              return snapshot.val()[key].data
//             }else{}
//         })
//         this.setState({ Data:FilterData })
//         console.log(FilterData[1].Type)

//         })
// }

renderItem = ({item}) => {
    return( 
      <View style={{backgroundColor:'grey',margin:10,flex: 1, flexDirection: 'row'}}>
          <Image source={{ uri: item.photo }} style={{width:100, height:100}} />
          <View style={{width:width*0.5,margin:10}}>
            <Title >{item.Type}</Title>
            <Paragraph >{item.email} </Paragraph>
           
          </View>
    </View>
  )
}

    render() {
        return (
            <View style={styles.container}>
                                <StatusBar  />
<View   style={{width:width,marginTop:Constants.statusBarHeight}}>
<Text> Past reports</Text>
                {/* <TimeAgo time={today} /> */}
</View>
             
        {/* <FlatList
        style={{width:width}}
            data={this.state.Data}
          //  keyExtractor={(item) => item.DataArray.id.toString()}
            showsVerticalScrollIndicator={false}
           // refreshing={this.state.isRefreshing}
            //onRefresh={this.onRefresh.bind(this)}
           // onScrollToTop={() => this.setState({ top: false})}
           // onMomentumScrollBegin={() => this.setState({ top: true})}

            // ref={(ref) => {
            //   this.ListView_Ref = ref;
            // }}
            renderItem={this.renderItem}  
          //  onEndThreshold={0}
          /> 
 */}



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        //justifyContent: "center"
    },
    // card: {
    //     width:width,
    // //    flex:1
    // },
    

});
