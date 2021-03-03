import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/stock/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'news', { headers: authHeader() });
  }

  getAvailableStocks() {
    return axios.get(API_URL + 'stocklist', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'stocks', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
