import React, { Component } from "react";

import AuthService from "../services/auth.service";

export default class ConfirmAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    AuthService.comfirmAccount(window.location.pathname.replace('/confirm/','')).then(
      response => {
        this.setState({
          content: response
        });        
      },
      error => {
        this.setState({
          content: 
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
            <h4>{this.state.content}</h4>
        </header>
      </div>
    );
  }
}
