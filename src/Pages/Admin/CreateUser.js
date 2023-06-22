import React, { useState} from 'react';
import '../../Components/css/style.css';
import './resource.css';
import { ResourcifyApi } from '../../Authentification/ResourcifyApi';

const CreateUser = () => {
    const [error, seterror] = useState();

    const [role, setRole] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [funds, setFunds] = useState(0);


    const handleSubmit = async (e) => {
      e.preventDefault();
      ResourcifyApi.createOrEditUser({
        request_type:"create",
        role:role.toUpperCase(),
        username:username,
        password:password,
        lastname:lastname,
        firstname:firstname
        }).then(res=>{
        setUsername("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setFunds(0)
        seterror("User Saved")
      }).catch(e=>{
        seterror("User Failed to Save");
      })

    }
    
    return ( 
    <div className="admin-outer">
      <div className="admin-toprow">
      <div className="form-container">
        <h2>Create/Edit User</h2>
        {error && <p>{error}</p>}
        <form id="userForm" onSubmit={handleSubmit}>
          <div className="radio-field-box">
            <label><input type="radio" value="createUser" name="type" checked />Create User</label>
            <label><input type="radio" value="editUser" name="type" />Edit User</label>
          </div>
          <div className="role-select">
            <select from="resourceForm" onChange={(e) => {setRole(e.target.value.toUpperCase())}}>
              <option value="Admin">Admin</option>
              <option value="Worker">Worker</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="text-field-box">
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <label>User Name</label>
          </div>
          <div className="text-field-box">
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <label>Password</label>
          </div>
          <div className="text-field-box">
            <input type="text" value={firstname} onChange={(e) => {setFirstname(e.target.value)}}/>
            <label>First Name</label>
          </div>
          <div className="text-field-box">
            <input type="text" value={lastname} onChange={(e) => {setLastname(e.target.value)}}/>
            <label>Last Name</label>
          </div>
          <div className="text-field-box">
            <input type="number" value={funds} onChange={(e) => {setFunds(e.target.value)}}/>
            <label>Set Funds</label>
          </div>
          <div class="button-field">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
        </div>
      </div>
      </div>
    );
}
 
export default CreateUser;