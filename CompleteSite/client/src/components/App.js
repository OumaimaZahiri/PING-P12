import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Profile from "./Profile";
import Stats from "./Stats";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.setGrades = this.setGrades.bind(this);
    this.grades=[[],[]];
    

    this.state = {
      currentUser: undefined,
      grades:[],
      showNavbar: (AuthService.getCurrentUser()),
      IAimplemented: false,
    };
  }

  setGrades(g) {
    this.setState({
      grades: g,
    });
    console.log(g)
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showNavbar: true,
      });
      console.log(this.grades)
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      showNavbar: false,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <div className="container mt-3">
          <BrowserRouter>
          { this.state.showNavbar ? ( <nav className="navbar navbar-expand navbar-dark bg-dark" >
          <Link to={"/"} className="navbar-brand">
            Irudigi
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

              <li className="nav-item">
                <Link to={"/stats"} className="nav-link">
                  Statistics
                </Link>
              </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this?.logOut}>
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
        </nav> ) : (<></>)}
          <Routes>
            <Route exact path={"/"} element={<Login/>} />
            <Route exact path={"/home"} element={<Home setGrades={this.setGrades}/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path={"/profile"} element={<Profile/>} />
            {(this.grades!==[[],[]]) ? (<Route exact path={"/stats"} element={<Stats notes1={this.grades[0]} notes2={this.grades[1]}/>} />)
            : null}
            
            {/* <Route path="/history" component={Profile} /> */}
          </Routes>
          </BrowserRouter>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;

