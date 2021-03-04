import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import News from "./components/news.component";
import StockList from "./components/stocklist.component";
import StockSummary from "./components/stocksummary.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import RequestPasswordReset from "./components/requestpasswordreset.component"
import ResetPassword from "./components/resetPassword.component"
import ConfirmAccount from "./components/confirm.component"


class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.checkResetToken = this.checkResetToken.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      resetToken: false,
      confirmationToken: false      
    };
  }

  componentDidMount() {
    this.checkResetToken();
    this.checkConfirmToken();
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  checkResetToken(){
    if(window.location.pathname.includes("/reset-password/"))
    {
      AuthService.isTokenFromAUser(window.location.pathname.replace('/reset-password/','')).then(
        response => {
          this.setState({
            resetToken: response
          });
        }
      );      
    }    
  }

  checkConfirmToken(){
    if(window.location.pathname.includes("/confirm/"))
    {
      AuthService.isConfirmTokenFromAUser(window.location.pathname.replace('/confirm/','')).then(
        response => {
          this.setState({
            confirmationToken: response
          });
        }
      );      
    }    
  }

   render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            JOAO
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/news"} className="nav-link">
                News
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/stock"} className="nav-link">
                  Wallet
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/stocklist"} className="nav-link">
                  Stock List
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/news"]} component={News} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/login/reset" component={RequestPasswordReset} />
            {this.state.currentUser ? <Route exact path="/profile" component={Profile}/> : null}
            {this.state.currentUser ? <Route path="/stock" component={BoardUser} /> : null}
            {this.state.currentUser ? <Route path="/stocklist" component={StockList} /> : null}
            {this.state.currentUser ? <Route path="/stocksummary" component={StockSummary} /> : null}
            {this.state.currentUser ? <Route path="/mod" component={BoardModerator} /> : null}
            {this.state.currentUser ? <Route path="/admin" component={BoardAdmin} /> : null}
            {this.state.resetToken  ? <Route path="/reset-password/:token" component={ResetPassword} /> : null}
            {this.state.confirmationToken  ? <Route path="/confirm/:token" component={ConfirmAccount} /> : null}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;