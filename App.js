/* @flow */
import React from "react";
import LoginScreen from './src/containers/LoginScreen';

export class Root extends React.Component {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }

  _simulateLogin = (username, password) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  if (this.state.isAppReady){
    return()
  }
  else {
    return(
      <LoginScreen
        login={this._simulateLogin}
        isLoggedIn={this.state.isLoggedIn}
        isLoading={this.state.isLoading}
        onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
      />
    )
  }
}

export default Root
