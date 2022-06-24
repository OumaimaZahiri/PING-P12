import React, { useRef, useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import Axios from 'axios';
import "./Login.css";

export default function Login(props) {
  
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const [loading, setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async(e) => {
    e.preventDefault();
    
      setLoading(true);
      try {
      const response = await AuthService.login(user, pwd);
      if (response.accessToken) {
        localStorage.setItem("user", JSON.stringify(response));
        console.log(response);
      }
        if(response?.message==="Logged in !")
        {
          navigate('/home');
          console.log("Here");
          setUser('');
          setPwd('');
          setSuccess(true);
          console.log(success);
          setLoading(false);
        }
        else{
          setErrMsg(response.message);
          setLoading(false);
        }
      }
      catch (err) {
        setErrMsg('Login Failed');
        errRef.current.focus();
        setLoading(false);
      }
  }

  return (
    <>
    {success ? (
      <section>
        <h1><Link to="/home">Home</Link></h1>
      </section>
    ) : (
    <section className="Login">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Please Log In</h1>
      <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username :</Form.Label>
          <Form.Control
            type="text"
            value={user}
            ref={userRef}
            autoComplete="off"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password :</Form.Label>
          <Form.Control
            type="password"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" id="button" disabled={loading}>
          Sign In
        </Button>
        {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
      </Form>
      <p>
        Don't have an account ?<br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  )}
    </>
  );
}
