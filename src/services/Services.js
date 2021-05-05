import axios from "axios";
import { BASE_URL } from "./constant";
class Services {
  activateAccount(activationCode) {
    return axios.get(
      `${BASE_URL}/email-verification/activating-account/${activationCode}`
    );
  }
  //Users Functions
  addUser(user) {
    return axios.post(`${BASE_URL}/users`, user);
  }
  getAllUsers() {
    return axios.get(`${BASE_URL}/users`);
  }
  userLogin(user) {
    console.log(`${BASE_URL}/login/user-login`);
    return axios.post(`${BASE_URL}/login/user-login`, user);
  }
  //Expert Functions
  addExpert(expert) {
    return axios.post(`${BASE_URL}/experts`, expert);
  }
  getAllExperts() {
    return axios.get(`${BASE_URL}/experts`);
  }
  expertLogin(user) {
    return axios.post(`${BASE_URL}/login/expert-login`, user);
  }
}
export default new Services();
