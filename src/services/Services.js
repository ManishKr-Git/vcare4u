import axios from "axios";
import { BASE_URL, SECRET_KEY } from "./constant";
var CryptoJS = require("crypto-js");
class Services {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Users Functions
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  activateUserAccount(activationCode) {
    return axios.get(
      `${BASE_URL}/user-email-verification/activating-account/${activationCode}`
    );
  }
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
  isUserLoggedIn() {
    let user = sessionStorage.getItem("user");
    if (user === null) {
      return false;
    }
    return true;
  }
  getUserBookings(id) {
    return axios.get(`${BASE_URL}/user-bookings/${id}`);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Expert Functions
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  activateExpertAccount(activationCode) {
    return axios.get(
      `${BASE_URL}/expert-email-verification/activating-account/${activationCode}`
    );
  }
  addExpert(expert) {
    return axios.post(`${BASE_URL}/experts`, expert);
  }
  getAllExperts() {
    return axios.get(`${BASE_URL}/experts`);
  }
  getExpert(id) {
    return axios.get(`${BASE_URL}/experts/${id}`);
  }
  expertLogin(user) {
    return axios.post(`${BASE_URL}/login/expert-login`, user);
  }
  isExpertLoggedIn() {
    let expert = sessionStorage.getItem("expert");
    if (expert === null) {
      return false;
    }
    return true;
  }
  updateExpertRating(expertId, ratingData) {
    return axios.post(`${BASE_URL}/expert-ratings/${expertId}`, ratingData);
  }
  getExpertBookings(id) {
    return axios.get(`${BASE_URL}/expert-bookings/${id}`);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //Common Functions
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  generateActivationCode() {
    let code = "";
    for (let k = 1; k <= 32; k++) {
      if (Math.random() * 10 > 3)
        code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      else code += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return code;
  }

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("expert");
  }
  // passwordEncryption(password) {
  //   var ciphertext = CryptoJS.AES.encrypt(
  //     JSON.stringify(password),
  //     SECRET_KEY
  //   ).toString();
  //   return ciphertext;
  // }
  passwordDecryption(password) {
    var bytes = CryptoJS.AES.decrypt(password, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  getExpertReviews(id) {
    return axios.get(`${BASE_URL}/expert-ratings/${id}`);
  }
  addBookingDetails(booking) {
    return axios.post(`${BASE_URL}/add-bookings/`, booking);
  }
  createOrder(orderData) {
    return axios.post(`${BASE_URL}/createOrder/`, orderData);
  }
}
export default new Services();
