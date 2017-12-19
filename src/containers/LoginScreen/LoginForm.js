//@flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "react-native-animatable";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Fumi } from "react-native-textinput-effects";
import { Button } from "react-native-elements";

import metrics from "../../config/metrics";
import HomeScreen from "../HomeScreen/HomeScreen";

const IS_ANDROID = Platform.OS === "android";

export default class LoginForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired
  };

  state = {
    email: "",
    password: ""
  };

  hideForm = async () => {
    if (this.buttonRef && this.formRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300)
      ]);
    }
  };

  _next = () => {
    this._passInput && this._passInput.focus();
  };

  _submit = () => {
    if (this.state.email && this.state.password) {
      console.log(this.state.email);
      this.props.onLoginPress(this.state.email, this.state.password);
    } else {
      alert(`Please enter your email and password.`);
    }
  };

  render() {
    const { email, password } = this.state;
    const { isLoading, onLoginPress } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={styles.form}
          ref={ref => {
            this.formRef = ref;
          }}
        >
          <Fumi
            style={styles.FumiContainer}
            label={"email@example.com"}
            labelStyle={[styles.FumiWrapper, { color: "#a3a3a3" }]}
            inputStyle={[styles.textInput, { color: "rgb(223, 0, 51)" }]}
            iconClass={MaterialCommunityIcons}
            iconName={"email-outline"}
            iconColor={"rgb(223, 0, 51)"}
            onChangeText={email => this.setState({ email })}
            ref={ref => {
              this._emailInput = ref;
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
            style={styles.FumiContainer}
            labelStyle={[styles.FumiWrapper, { color: "#a3a3a3" }]}
            label={"Password"}
            inputStyle={[styles.textInput, { color: "rgb(223, 0, 51)" }]}
            iconClass={MaterialCommunityIcons}
            iconName={"lock-outline"}
            iconColor={"rgb(223, 0, 51)"}
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
          <View
            ref={ref => (this.buttonRef = ref)}
            animation={"bounceIn"}
            duration={600}
            delay={400}
          >
            <Button
              buttonStyle={styles.button}
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
              animation={"fadeIn"}
              duration={600}
              delay={400}
            >
              {"Not registered yet?"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
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
    justifyContent: "center"
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
  signupLink: {
    color: "white",
    alignSelf: "center",
    padding: 20
  },
  FumiContainer: {
    marginTop: 2,
    marginBottom: 10,
    height: 62
  },
  FumiWrapper: {
    height: 42,
    marginBottom: 2,
    height: 62
  },
  textInput: {
    flex: 1,
    color: "white",
    margin: IS_ANDROID ? -1 : 0,
    height: 48,
    padding: 7
  }
});
