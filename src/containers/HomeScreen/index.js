import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';

import { Button } from "react-native-elements";

/**
 * Just a centered logout button.
 */
export default class HomeScreen extends Component {
  static propTypes = {
    logout: PropTypes.func
  }

  render () {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.button}
          textStyle={{
            textAlign: "center",
            color: "rgb(223, 0, 51)",
            fontSize: 20
          }}
          title={`Logged In!`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 42,
    width: 300,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "white"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
