import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';

export default class StartScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
      };
  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block center flex={0.9}  style={styles.padded}>
            <Block >
              {/* <Block middle>
                <Image source={Images.NowLogo} style={{ width: 115, height: 124, bottom: 200, position: 'absolute' }} />
              </Block> */}
              <Block row>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() =>this.props.navigation.navigate('Login')}
                >
                  <Text
                    style={{ fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Login
                  </Text>
                </Button>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() =>this.props.navigation.navigate('Register')}
                >
                  <Text
                    style={{ fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Register
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
  },
  padded: {
    paddingHorizontal: width * 0.1,
    zIndex: 3,
    position: 'absolute',
    bottom: height * 0.07,
   
  },
  button: {
    width: width * 0.3,
    height: height * 0.07,
    margin: width * 0.03,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
