import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Authentification/Auth';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import '../Pages/login.css';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loggedIn, setloggedIn] = useState(false);
    const [error, seterror] = useState(null);
    const Auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await ResourcifyApi.authenticate(username, password)
          .then(response => {
            const { id, name, role } = response.data;
            const authdata = window.btoa(username + ':' + password);
            const user = { id, name, role, authdata };
            Auth.userLogin(user);
            setloggedIn(true);
            navigate("/Home")
          })
          .catch((e) => {
            seterror(e);
            console.log(error);
          })
      }
    const revealErr = () =>{
      return <p>Bad Credentials, Try Again</p>
    }

    return ( 
      <>
        <div className="content login">
          <div className="form-container">
          <h2>Login</h2>
          {error && revealErr()}
          <form onSubmit={handleSubmit}>
            <div className="text-field-box">
              <input type="text" value={username} onChange={(e) => {setusername(e.target.value)}}/>
              <label>Username</label>
            </div>
            <div className="text-field-box">
              <input type="password" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
              <label>Password</label>
            </div>
            <div className="button-field">
              <button type="submit" className="button">Sign In</button>
            </div>
          </form>
        </div>
      </div>
      </>
      
    );
}
 
export default Login;

