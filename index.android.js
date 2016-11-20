import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  StyleSheet
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


class Simple extends Component {

  handleButtonPress() {
    console.log('I was pressed')
  }

  render() {
    return (
      <View style={styles.container}>
        <AwesomeButton states={{
                        default: {
                          text: 'Press me',
                          onPress: this.handleButtonPress,
                          backgroundColor: '#1155DD'
                        }
                       }} />
      </View>
    )
  }

}


AppRegistry.registerComponent('Simple', () => Simple)