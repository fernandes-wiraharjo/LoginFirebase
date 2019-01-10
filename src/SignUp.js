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

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirm_pass: ""
    };
  }

  DoSignUp = () => {
    const { email, password, confirm_pass } = this.state;
    if (email === "" || password === "" || confirm_pass === "") {
      console.log("Field can not be empty!");
    } else {
      if (password !== confirm_pass) {
        console.log("Password and confirmation password should be the same!");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
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
        <TextInput
          onChangeText={txt => this.setState({ confirm_pass: txt })}
          placeholder="Password Confirmation"
        />
        <TouchableOpacity onPress={() => this.DoSignUp()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUp;
