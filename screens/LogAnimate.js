import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');


class LogAnimate extends Component {
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center'
        }}
      >
        <Text>oooooooooooooooooooooooooooooooooooooooo</Text>
        
      </View>
    );
  }
}
export default LogAnimate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
