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
import { Button, Header, Icon } from "react-native-elements";
import { human } from "react-native-typography";
import { DrawerNavigator, TabNavigator } from "react-navigation";
import metrics from "../../config/metrics";
import ChartScreen from "../ChartScreens/ChartScreen";
import SummaryScreen from "../ChartScreens/SummaryScreen";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="menu" color="white" underlayColor="rgb(223, 0, 51)" />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="menu"
              color="white"
              underlayColor="rgb(223, 0, 51)"
              onPress={() => this.props.navigation.navigate("DrawerToggle")}
            />
          }
          centerComponent={
            <Text style={[human.title3, styles.headline]}>Home</Text>
          }
          rightComponent={
            <Icon
              name="home"
              color="white"
              underlayColor="rgb(223, 0, 51)"
              onPress={() => this.props.navigation.navigate("Home")}
            />
          }
          outerContainerStyles={{ backgroundColor: "rgb(223, 0, 51)" }}
        />
      </View>
    );
  }
}

const DrawerRoutes = {
  Home: {
    name: "Home",
    screen: HomeScreen
  }
};

const RootDrawer = DrawerNavigator(
  {
    ...DrawerRoutes
  },
  {
    contentOptions: {
      activeTintColor: "#rgb(223, 0, 51)"
    }
  }
);

const TabNav = TabNavigator(
  {
    Home: {
      screen: RootDrawer
    },
    Chart: {
      screen: ChartScreen
    },
    Summary: {
      screen: SummaryScreen
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "white",
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: "#rgb(223, 0, 51)"
      }
    }
  }
);

export default TabNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    backgroundColor: "white"
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
    color: "white",
    fontWeight: "bold"
  },
  headline: {
    color: "white"
  }
});
