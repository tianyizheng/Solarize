/* @flow */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryScatter
} from "victory-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Fumi } from "react-native-textinput-effects";
import { Button } from "react-native-elements";

export default class Login extends React.Component {
  state = {
    name: "",
    password: ""
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.card1}>
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
        <View style={styles.buttonContainer}>
        <Button
          containerViewStyle={{
            paddingTop: 42
          }}
          buttonStyle={{
            backgroundColor: "white",
            borderRadius: 10,
            width: 162
          }}
          textStyle={{
            textAlign: "center",
            color: "rgb(223, 0, 51)",
            fontSize: 20
          }}
          title={`Log in`}
          onPress={this._submit}
        />
        <Button
          containerViewStyle={{
            paddingTop: 42
          }}
          buttonStyle={{
            backgroundColor: "white",
            borderRadius: 10,
            width: 162
          }}
          textStyle={{
            textAlign: "center",
            color: "rgb(223, 0, 51)",
            fontSize: 20
          }}
          title={`Register`}
        />
      </View>
      </ScrollView>
    );
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "rgb(223, 0, 51)"
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingTop: 32,
    paddingBottom: 300
  },
  card1: {
    padding: 16
  },
  input: {
    marginTop: 16
  },
  title: {
    paddingTop: 24,
    paddingBottom: 24,
    textAlign: "center",
    color: "rgb(235, 221, 45)",
    fontSize: 30,
    fontWeight: "bold"
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
