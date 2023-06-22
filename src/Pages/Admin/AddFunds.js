import React, { useState} from 'react';
import { ResourcifyApi } from '../../Authentification/ResourcifyApi';

const Funds = () => {
    const [username, setusername] = useState("");
    const [funds, setFunds] = useState(0);
    const [error, seterror] = useState(null);
    const [success, setSuccess] = useState("");
    

    const handleSubmit = async (e) => {
     e.preventDefault()
      await ResourcifyApi.addFunds(username,funds)
        .then(response => {
          setSuccess("Funds Added Sucessfully");
          seterror(null);
          setusername("")
          setFunds(0)
          console.log(response)
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
      <div className="content">
        <div className="form-container">
        <h2>Add Funds</h2>
        {success && revealSucess()}
        {error && revealErr()}
        <form onSubmit={handleSubmit}>
          <div className="text-field-box">
            <input type="text" value={username} onChange={(e) => {setusername(e.target.value)}}/>
            <label>Username</label>
          </div>
          <div className="text-field-box">
            <input type="number" value={funds} onChange={(e) => {setFunds(e.target.value)}}/>
            <label>Amount</label>
          </div>
          <div className="button-field">
            <button type="submit" className="button">Add</button>
          </div>
        </form>
      </div>
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
      </div>
      
    );
}
 
export default Funds;

