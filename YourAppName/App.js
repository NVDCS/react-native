import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import DialogInput from 'react-native-dialog-input';

  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
  };

  firebase.initializeApp(config);

export default class App extends React.Component {
  
  constructor(props) {
      super(props)

      this.state=({
        email: '',
        password: '',
        isDialogVisible: false
      })
  }

signUpUser = (email, password) => {
  try {
    if(this.state.password.length<6)
    {
      alert("Please enter at least 6 characters")
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      alert("Congratulations, your account has been setup")
  }
  catch(error){
    console.log(error.toString())
  }
}
 

loginUser = (email, password) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) =>{
      Alert.alert(
        'Signed In',
        'You have signed in. Well done!',
        [
          {text: 'Sign Out', onPress: this.signOutUser},
        ],
        { cancelable: false }
      )
    })
  }
  catch(error) {
    console.log(error.toString())
  }
}

signOutUser = () => {
  firebase.auth().signOut().then(function (user){
  }).catch(function(error) {
    console.log(error)
  });
}

forgotPassword = () => {
  this.setState({
    isDialogVisible: this.state.isDialogVisible = true
  })
}

sendReset = (useremail) => {
  var auth = firebase.auth();
  auth.sendPasswordResetEmail(useremail).then(function() {
    alert("Password reset email has been sent")
  }).catch(function(error) {
    console.log(error)
  });
}

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.mainheader}>Login Page</Text>
        <Form>
          <Item>
            <Label>Email</Label>
            <Input
              autocorrect={false}
              onChangeText={(email) => this.setState({ email })}/>
          </Item>
          <Item>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}/>
          </Item>
          <Button style={{marginTop:10}} primary full rounded
          onPress={() => this.loginUser(this.state.email, this.state.password)}>
          <Text style={{color: 'white'}}>Login</Text>
          </Button>
          <Button style={{marginTop:10}} success full rounded
          onPress={() => this.signUpUser(this.state.email, this.state.password)}>
          <Text style={{color: 'white'}}>Sign Up</Text>
          </Button>
          <Button style={{marginTop:10}} warning full rounded
          onPress={() => this.forgotPassword()}>
          <Text style={{color: 'white'}}>Forgot Password</Text>
          </Button>
        </Form>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"Forgot Password"}
            message={"Please input your email address"}
            hintInput ={"john@test.com"}
            submitInput={ (useremail) => {this.sendReset(useremail)} }
            closeDialog={ () => { this.setState({
            isDialogVisible: this.state.isDialogVisible = false
            })}}>
        </DialogInput>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
  mainheader: {
    color: '#000066',
    textAlign: 'center',
    fontSize: 16
  },
});