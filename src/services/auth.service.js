import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  requestPasswordReset(email){
    return axios.post(API_URL + "request-password-reset", {
      email
    });
  }

  resetPassword(token, password){
    return axios.post(API_URL + "reset-password", {
      token,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  isTokenFromAUser(token){
    return axios.get(API_URL + "check-reset-token", {
      params: {
        token: token
      }
    })
    .then(response => {
     return response.data;
    })
    .catch(error => {
      return false;
    });      
  }

  isConfirmTokenFromAUser(token){
    return axios.get(API_URL + "check-confirm-token", {
      params: {
        token: token
      }
    })
    .then(response => {
     return response.data;
    })
    .catch(error => {
      return false;
    });      
  }

  comfirmAccount(token){
    return axios
      .get(API_URL + "sign-up/confirm", {
        params: {
          token: token
        }
      })
      .then(response => {
        return response.data;
      });    
  }
  
}

export default new AuthService();
