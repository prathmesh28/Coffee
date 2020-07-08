import React, { Component } from "react" 
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  StatusBar,
  View
} from "react-native" 
import { Button, Block, Text } from "../components" 
import { theme } from "../constants" 
const { width, height } = Dimensions.get("window") 
import AppIntroSlider from 'react-native-app-intro-slider';
import slides from "./Slides"
class Welcome extends Component {
  static navigationOptions = {
    headerShown: false
  }

  scrollX = new Animated.Value(0) 
 
  state = {
    showRealApp: false,
    showTerms: false
  } 

  renderIllustrations() {
    const { illustrations } = this.props 
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }
        ])}
      />
    ) 
  }

  renderSteps() {
    const { illustrations } = this.props 
    const stepPosition = Animated.divide(this.scrollX, width) 
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          }) 

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          ) 
        })}
      </Block>
    ) 
  }


  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
         // paddingBottom: 100
        }}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <Block style={styles.container}>
         <StatusBar translucent={true} backgroundColor={'#0AC4BA'}/>
          <AppIntroSlider
            data={slides}
            renderItem={this._renderItem}
            onDone={() => {
              this.setState({ showRealApp: false })
              this.props.navigation.navigate('Register')}}
            showSkipButton={true}
            onSkip={() => {
              this.setState({ showRealApp: false })
              this.props.navigation.navigate('Register')}}
          />
        </Block>
      );
    } else {

    return (
      <Block>
         <StatusBar translucent={true} backgroundColor={'#0AC4BA'}/>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary>
              {" "}
              Greener.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.4} margin={[0, theme.sizes.padding * 2]}>
        
          <Button gradient onPress={() => this.setState({ showRealApp: true })}>
            <Text center semibold>
              Welcome
            </Text>
          </Button>
          </Block>
          <Block flex={0.1}>
          <Text center semibold >
              By signing in you agree to our
              <Text primary>
              {" "}
              terms and conditions.
            </Text>
              
          </Text>
          </Block>
          
        
      </Block>
    ) }
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration_1.png") },
    { id: 2, source: require("../assets/images/illustration_2.png") },
    { id: 3, source: require("../assets/images/illustration_3.png") }
  ]
} 

export default Welcome 

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  },
  image: {
    width: width,
    height: height,
  },
  text: {
    padding: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    position:"absolute",
    bottom:100
  //  paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    //fontWeight: 'bold',
    marginTop: 50,
  },
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
}) 