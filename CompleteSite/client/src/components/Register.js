import { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from 'axios';
import AuthService from "../services/auth.service";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import SplitButton from "../visualTools/splitButton";
import "./Register.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%]).{8,24}$/;

function Register(props) {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [role, setRole] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    const options = [ 'Choose Your Role :', 'Expert', 'Student' ];

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
      setErrMsg('');
    }, [user, email, pwd, matchPwd])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await AuthService.register(user, email, pwd, role);
      if (response.data==="Success")
      {
        navigate('/login');
        setUser('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
        setSuccess(true);
      }
      else
      {
        setErrMsg(response.data);
      }
    }
      catch (err) {
        setErrMsg('Registration Failed');
        errRef.current.focus();
      }
    }
  return (
    <>
    {success ? (
      <section>
        <h1>Success !</h1>
        <p>
          <a href="/">Sign In</a>
        </p>
      </section>
    ) : (
      <section className="Register-wrapper">
        <div>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Please Sign Up</h1>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label>
            Username :
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          </Form.Label>
          <Form.Control
            type="text"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            placeholder="Ex. user"
          />
          <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>          
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>
            Email :
            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
          </Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            placeholder="Ex. user@email.com"
          />
          <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must have the form of an email adress.<br />
            Must have at least a character before the @ and after.
          </p> 
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>
            Password :
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
          </Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            placeholder="Ex. Password123."
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="dot">.</span>
          </p>
        </Form.Group>

        <Form.Group size="lg" controlId="confirm_pwd">
          <Form.Label>
            Confirm Password :
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
          </Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder="Ex. Password123."
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </Form.Group>

        <div className="form-group">
          <label htmlFor="Type of user">Type of user</label>
          <SplitButton required options={options} setChoice={setRole} />
        </div>
        
        <Button block="true" size="lg" type="submit">
          Sign up
        </Button>
      </Form>
      <p>
        Already registered ?<br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
      </div>
       </section>

    )}
    </>
    
  )
}

export default Register;
