import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Fumi } from "react-native-textinput-effects";
import { Button } from "react-native-elements";

import metrics from '../../config/metrics'

export default class LoginForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: ''
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
      ])
    }
  }

  _next = () => {
    this._passInput && this._passInput.focus();
  };

  _submit = () => {
    if (this.state.name && this.state.password) {
      alert(
        `Welcome, ${this.state.name}! Confirmation email has been sent to ${
          this.state.password
        }`
      );
    } else {
      alert(`Please enter your email and password.`);
    }
  };

  render () {
    const { email, password } = this.state
    const { isLoading, onLoginPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <Fumi
            label={"email@example.com"}
            labelStyle={{ color: "#a3a3a3" }}
            inputStyle={{ color: "#f95a25" }}
            iconClass={MaterialCommunityIcons}
            iconName={"email-outline"}
            iconColor={"#f95a25"}
            onChangeText={name => this.setState({ name })}
            ref={ref => {
              this._nameInput = ref;
            }}
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={this._next}
            blurOnSubmit={false}
          />
          <Fumi
            style={styles.input}
            labelStyle={{ color: "#a3a3a3" }}
            label={"Password"}
            iconClass={MaterialCommunityIcons}
            iconName={"lock-outline"}
            iconColor={"#f95a25"}
            onChangeText={password => this.setState({ password })}
            ref={ref => {
              this._passInput = ref;
            }}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            onSubmitEditing={this._submit}
            blurOnSubmit={true}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <Button
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10
              }}
              textStyle={{
                textAlign: "center",
                color: "rgb(223, 0, 51)",
                fontSize: 20
              }}
              title={`Log in`}
              onPress={this._submit}
            />
            <Text
            style={styles.signupLink}
            animation={'fadeIn'}
            duration={600}
            delay={400}
            >
            {'Not registered yet?'}
          </Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
