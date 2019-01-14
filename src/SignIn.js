import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "./components/common";
import firebase from "@firebase/app";
import "@firebase/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  DoSignIn = () => {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    if (email === "" || password === "") {
      console.log("Field can not be empty!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          this.onLoginSuccess;
        })
        .catch(error => {
          console.log(error);
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail);
        });
    }
  };

  onLoginSuccess = () => {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  };

  onLoginFail = () => {
    this.setState({ error: "Authentication Failed.", loading: false });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return <Button onPress={this.DoSignIn}>Log In</Button>;
  }

  render() {
    return (
      // <View>
      //   <TextInput
      //     onChangeText={txt => this.setState({ email: txt })}
      //     placeholder="Email"
      //   />
      //   <TextInput
      //     onChangeText={txt => this.setState({ password: txt })}
      //     placeholder="Password"
      //   />
      //   <TouchableOpacity onPress={() => this.DoSignIn()}>
      //     <Text>Submit</Text>
      //   </TouchableOpacity>
      // </View>
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

export default SignIn;
