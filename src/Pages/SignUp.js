import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const SignUp = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, seterror] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
      e.preventDefault()
  
      await ResourcifyApi.signup(firstName,lastName,username, password)
        .then(response => {
          setSuccess("User created sucessfully redirecting to login page...")
          seterror(null);
          setTimeout(() =>{navigate("/")},2000);
        })
        .catch((e) => {
          seterror(e);
          console.log(error);
        })
    }
    
    



    const revealErr = () =>{
      return <p>{error}</p>
    }
    const revealSucess = () =>{
      return <p>{success}</p>
    }
    return ( 
      <>
        
        <div className="form-container">
        <h2>Sign Up</h2>
        {success && revealSucess()}
        {error && revealErr()}
        <form onSubmit={handleSubmit}>
        <div className="text-field-box">
            <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
            <label>First Name</label>
          </div>
          <div className="text-field-box">
            <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
            <label>Last Name</label>
          </div>
          <div className="text-field-box">
            <input type="text" value={username} onChange={(e) => {setusername(e.target.value)}}/>
            <label>Username</label>
          </div>
          <div className="text-field-box">
            <input type="password" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
            <label>Password</label>
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
      </>
      
    );
}
 
export default SignUp;

