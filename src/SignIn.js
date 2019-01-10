import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import firebase from "@firebase/app";
import "@firebase/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  DoSignIn = () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      console.log("Field can not be empty!");
    } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
  };

  render() {
    return (
      <View>
        <TextInput
          onChangeText={txt => this.setState({ email: txt })}
          placeholder="Email"
        />
        <TextInput
          onChangeText={txt => this.setState({ password: txt })}
          placeholder="Password"
        />
        <TouchableOpacity onPress={() => this.DoSignIn()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignIn;
