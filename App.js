import React, { Component } from "react";
import { Text, View } from "react-native";
import { config } from "./credentials/firebaseCredentials";
import { Header, Button, Spinner } from "./src/components/common";
import firebase from "@firebase/app";
import "@firebase/auth";
// import SignUp from "./src/SignUp";
import SignIn from "./src/SignIn";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <SignIn />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
    //return <SignIn />;
  }
}

export default App;
