import React, { useState, useEffect } from 'react';
import '../../Components/css/style.css';
import DisplayCard from '../../Components/DisplayCard';
import ItemDescriptionCard from '../../Components/ItemDescriptionCard';
import './resource.css';

const CreateResource = () => {
    const [type, setType] = useState();
    const [resourceID, setresourceID] = useState();
    const [model, setmodel] = useState();
    const [imageLink, setimageLink] = useState();
    const [salePrice, setSalePrice] = useState();
    const [borrowFee, setBorrowFee] = useState();

    const [role, setRole] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [funds, setFunds] = useState();

    const [preview, setPreview] = useState();


    useEffect(() => {
      if (!imageLink) {
          setPreview(null)
          return
      }
      const previewUrl = URL.createObjectURL(imageLink)
      setPreview(previewUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(previewUrl)
  }, [imageLink])

    const handleSubmit = async (e) => {
      
    }
    
    return ( 
    <div className="admin-outer">
      <div className="admin-toprow">
        <div className="form-container">
          <h2>Create/Edit Resource</h2>
          {/* {error && revealErr()} */}
          <form id="resourceForm" onSubmit={handleSubmit}>
          <div className="radio-field-box">
            <label><input type="radio" value="create" name="type" checked />Create Resource</label>
            <label><input type="radio" value="edit" name="type" />Edit Resource</label>
          </div>
          <p>Resource Name:</p>
          <div className="resource-select">
            <select from="resourceForm" onChange={(e) => {setType(e.target.value)}}>
                <option value="Desktop">Desktop</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Projectors">Projector</option>
                <option value="Cameras">Camera</option>
                <option value="Calculator">Calculator</option>
            </select>
          </div>
          <div className="text-field-box">
            <input type="text" value={resourceID} onChange={(e) => {setresourceID(e.target.value)}}/>
            <label>Resource ID</label>
          </div>
          <div className="text-field-box">
            <input type="text" value={model} onChange={(e) => {setmodel(e.target.value)}}/>
            <label>Model #</label>
          </div>
          <div className="text-field-box">
            <input type="number" value={salePrice} onChange={(e) => {setSalePrice(e.target.value)}}/>
            <label>Sale Price</label>
          </div>
          <div className="text-field-box">
            <input type="number" value={borrowFee} onChange={(e) => {setBorrowFee(e.target.value)}}/>
            <label>Borrow Fee</label>
          </div>
          <div className="text-field-box">
            <input type="file"  accept="image/*" placeholder="Upload an Image" required  onChange={(e) => {setimageLink(e.target.files[0])}}/>
            <label>Image</label>
          </div>
          <div class="button-field">
            <button type="submit" className="button">Submit</button>
          </div>
          </form>
        </div>
        <div className="preview">
          <h2>Product Preview</h2>
          <DisplayCard key={model} className='temp'>
          <img  alt= {resourceName}src = {preview}></img>
          <ItemDescriptionCard json={{
            name: resourceName,
            model: model,
            salePrice: salePrice,
            borrowFee: borrowFee,
            image: preview
            }}/>
          </DisplayCard>
        </div>
      </div>
      <div className="form-container">
        <h2>Create/Edit User</h2>
        <form id="userForm" onSubmit={handleSubmit}>
          <div className="selectForm">
            <select from="resourceForm" onChange={(e) => {setRole(e.target.value)}}>
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
            <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
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
        </form>
      </div>
    </div>
    );
}
 
export default CreateResource;