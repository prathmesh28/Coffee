import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
export default class PostScreen extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>hi</Text>
      </View>
    );
  }

}