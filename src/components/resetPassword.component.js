import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

export default class RequestPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    
    this.state = {
      password: "",
      password_repeat: "",
      loading: false,
      message: ""
    };
  }

  onChangePassword(e) {
      this.setState({
      password: e.target.value
    });
  }

  onChangeRepeatPassword(e) {
    this.setState({
      password_repeat: e.target.value
    });
    if(e.target.value!==this.state.password)
    {
        this.setState({
            message: "Passwords do not match."
          });
    }
    else
    {
        this.setState({
            message: ""
          });
    }
  }  
 
  handleResetPassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

   
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.resetPassword(
        this.props.match.params.token,
          this.state.password).then(
        response => {
          
          this.setState({
            message: response.data.message,
            loading: false,
            successful: true
            });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
            successful: false
          });
        }
      );      
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleResetPassword}
            ref={c => {
              this.form = c;
            }}
          >
            
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required, vpassword]}
              />

              <label htmlFor="password">Repeat Password</label>
              <Input
                type="password"
                className="form-control"
                name="password-repeat"
                value={this.state.password_repeat}
                onChange={this.onChangeRepeatPassword}
                validations={[required]}
                />
            </div>
           
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Change Password</span>
              </button>              
            </div>

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}