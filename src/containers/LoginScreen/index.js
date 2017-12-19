//@flow
import React from "react";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { Image, View, Text } from "react-native-animatable";
import { human } from 'react-native-typography';

import imgLogo from "../../img/ComEd.png";
import metrics from "../../config/metrics";

import Opening from './Opening'
import LoginForm from './LoginForm'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

if (Platform.OS === "android")
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LoginScreen extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired // Called at the end of a succesfull login/signup animation
  }

  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  };

  componentWillUpdate(nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen();
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null);
    // 2. Fade out the logo
    await Promise.all([
      this.logoImgRef.fadeOut(800),
      this.textRef.fadeOut(200)
    ]);
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted();
  };

  _setVisibleForm = async visibleForm => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm();
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // 3. Set the new visible form
    this.setState({ visibleForm });
  };

  render() {
    const { isLoggedIn, isLoading, login } = this.props;
    const { visibleForm } = this.state;
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = !visibleForm ? { height: 0 } : { marginTop: 40 };

    return (
      <View style={styles.container}>
        <Image
          animation={"bounceIn"}
          duration={1200}
          delay={200}
          ref={ref => (this.logoImgRef = ref)}
          style={styles.logoImg}
          source={imgLogo}
        />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={[human.title2, styles.text]}
            animation={"fadeIn"}
            duration={1200}
            delay={200}
            ref={ref => (this.textRef = ref)}
          >
            Your Solar Energy Portal
          </Text>
        </View>
        {!visibleForm &&
          !isLoggedIn && (
            <Opening
              onSignInPress={() => this._setVisibleForm("LOGIN")}
            />
          )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={"padding"}
          style={[formStyle, styles.bottom]}
        >
          {visibleForm === "LOGIN" && (
            <LoginForm
              ref={ref => (this.formRef = ref)}
              onLoginPress={login}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: 'rgb(223, 0, 51)',
  },
  text: {
    color: "rgb(223, 0, 51)",
    alignSelf: "center"
  }
})
