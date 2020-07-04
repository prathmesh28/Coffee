import React from "react";
import {  View, StyleSheet,StatusBar, FlatList, Dimensions, Image } from "react-native";
import Firebase from "../firebase"
const { width, height } = Dimensions.get('screen') 
import Constants from 'expo-constants'
import _ from 'lodash'
let date
import { Text, Button } from "../components" 

import { theme } from "../constants" 

import TimeAgo from 'react-native-timeago';
let timestamp = "2015-06-21T06:24:44.124Z";
var today
let arr = []
export default class MessageScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          Data: null
        }
      }
     
    
componentDidMount() { 
  today = new Date() 
  console.log(today)
  // let Date = new date()
  // timestamp = Date.now()
  // console.log(timestamp)
    let email = Firebase.auth().currentUser.email
    Firebase.database()
      .ref("UserData/")
      .on("value", (snapshot) => {
 //console.log(snapshot.val())
        // const FilterData = Object.keys(snapshot.val()).map(function(key, index) {
        //     if(snapshot.val()[key].data.email === email){
        //      return snapshot.val()[key].data
        //     }else{return null}
        // })
        const friends = _.filter(snapshot.val(), (itm) => {
          if(itm.data.email===email)
          {
            return itm.data
          }
          //console.log(itm.data.email)
        })
       // console.log(friends)
     
   //     const result = snapshot.val().map((itm) => {
  //        console.log(itm)
     //     this.state.hio.includes(itm.DataArray.contentType)
  //      })
     //   this.setState({ InfoData : result })
    

        //     Object.filter = (obj, predicate) => 
        //   Object.keys(obj)
        //         .filter( key => predicate(obj[key]) )
        //         .reduce( (res, key) => (res[key] = obj[key], res), {} );
        // const FilterData = Object.filter(snapshot.val(), data=> email===email)
        // console.log(FilterData)
  

         this.setState({ Data:friends.reverse() })
   //     console.log(FilterData)

        })
}

renderItem = ({item}) => {
    return( 
      <View style={{backgroundColor:'#f7fcf8',margin:10,flex: 1, borderRadius:5 ,  flexDirection: 'row'}}>
          <Image source={{ uri: item.data.photo }} style={{width:100, height:100}} />
          <View style={{width:width*0.5,margin:10}}>
            <Text primary h2 bold>{item.data.Type==='Animals'?'Dead Animals':item.data.Type}</Text>
            <Text secondary>{item.data.Details} </Text>
            <TimeAgo time={item.data.date} />
          </View>
    </View>
    
  )
}
renderSeparator = () => (
  <View style={{ height:1,backgroundColor:'#808088',marginHorizontal:20}}/>
)

ListEmpty = () => {
  return (
    <View >
      <Text bold center h2 style={{ 
            textShadowColor:'#fff',
            textShadowOffset:{width: 0, height: 0},
            textShadowRadius:20, 
       }}>No Data</Text>
    </View>
  )
}

    render() {
      return (
        <View style={styles.container}>
          <StatusBar  backgroundColor={theme.colors.primary}/>
          <View   style={{width:width,marginVertical:Constants.statusBarHeight}}>
            <Button gradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} 
                  startColor={theme.colors.primary} endColor={'#fff'} style={{borderRadius:0,marginVertical:0,height:Constants.statusBarHeight}}>
            </Button>
            <Text center h1 black bold style={{ letterSpacing:1,    textShadowColor:'#2BDA8E',
                textShadowOffset:{width: 0, height: 0},
                textShadowRadius:10,
            }}> History</Text>
          </View>
          
          <FlatList
            style={{width:width}}
            data={this.state.Data}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.ListEmpty}
        //  keyExtractor={(item) => item.id.toString()}
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
