//@flow
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
  TouchableHighlight
} from "react-native";
import PropTypes from "prop-types";
import {
  Button,
  Header,
  Icon,
  ButtonGroup,
  Divider
} from "react-native-elements";
import { human } from "react-native-typography";
import { DrawerNavigator } from "react-navigation";
import metrics from "../../config/metrics";
import HomeScreen from "../HomeScreen/HomeScreen";

const component1 = () => <Text>Hello</Text>;
const component2 = () => <Text>World</Text>;
const component3 = () => <Text>ButtonGroup</Text>;

const buttons = [
  { element: component1 },
  { element: component2 },
  { element: component3 }
];

export default class ChartScreensButtonGroup extends React.Component {
  state = {
    index: 0
  };

  updateIndex = index => {
    this.setState({ index });
    console.log(index);
  };

  render() {
    if (this.state.index === 2) {
      return <HomeScreen />;
    } else {
      return (
        <View style={styles.container}>
          <ButtonGroup
            selectedBackgroundColor="pink"
            onPress={this.updateIndex}
            selectedIndex={this.state.index}
            buttons={buttons}
            containerStyle={{ height: 30 }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
