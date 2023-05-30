import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Authentification/Auth';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import './login.css';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loggedIn, setloggedIn] = useState(false);
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
          .catch(error => {
            console.log(error);
          })
      }

    return ( 
      
      <form onSubmit={handleSubmit}>
        <div className="container">
        <label>
          UserName
          <textarea value={username} onChange={(e) => {setusername(e.target.value)}} />
        </label>
        <label>
          Password
          <textarea value={password} onChange={(e) => {setpassword(e.target.value)}} />
        </label>
        <button type="submit">submit</button>
        </div>
      </form>
        // <>
        // <button onClick={handleSubmit}>Login</button>
        // </>
        
      
    );
}
 
export default Login;

