import Axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  async login(username, password) {
    return Axios.post(API_URL + "signin", {
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
    localStorage.clear();
  }

  register(username, email, password, role) {
    console.log({
      username,
      email,
      password,
      role
    });
    return Axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  request(compare, outline) {
    return Axios.post(API_URL + "request", {
    two: compare,
    outline: outline
    })
  }

  config(compare, config, compt) {
    return Axios.post(API_URL + "conf", {
      two : compare,
      conf: config%2,
      frame : compt
    })
  }

  unknown(compt, compare) {
    return Axios.post(API_URL + "unknown_frame", {
      number: compt,
      two: compare
    })
  }

  submitGrade(compare, note, outline) {
    return Axios.post(API_URL + "graded", {
      two: compare,
      value: note,
      outline : outline,
      username: JSON.parse(localStorage.getItem('user')).username
    })
  }

  getNotes() {
    return Axios.post(API_URL + "get_notes", {})
  }

}

export default new AuthService();
