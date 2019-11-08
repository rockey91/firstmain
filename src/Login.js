import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import App from './App';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login : true,
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    var form = event.target;
    var username = form[0].value;
    var password = form[1].value;

    // var username = 'rockey91@gmail.com';
    // var password = 'rockey91@FM';

    var setState = this.setState.bind(this);

    // AWS Code

    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    global.fetch = require('node-fetch');

    var authenticationData = {
      Username : username,
      Password : password
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
      UserPoolId : 'us-east-2_DNSoeZiN6', // Your user pool id here
      ClientId : '3esc1a8nj75d62lmuqgpqntakf', // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
      Username : username,
      Pool : userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);

        setState({
          login: false
        });

      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
      // newPasswordRequired: function (userAttributes) {
      //   delete userAttributes.email_verified;
      //   cognitoUser.completeNewPasswordChallenge('rockey91@FM', userAttributes, this);
      // }
    });

    event.preventDefault();
  }

  render() {
    return (
      this.state.login === true ? <div className="Login">
      <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="email">
      <Form.Control
      autoFocus
      type="email"
      placeHolder="Username/Email"
      value={this.state.email}
      onChange={this.handleChange}
      />
      </Form.Group>
      <Form.Group controlId="password">
      <Form.Control
      value={this.state.password}
      placeHolder="Password"
      onChange={this.handleChange}
      type="password"
      />
      </Form.Group>
      <Button
      block
      disabled={!this.validateForm()}
      type="submit"
      >
      Login
      </Button>
      </Form>
      </div> : <App />
    );
  }
}
