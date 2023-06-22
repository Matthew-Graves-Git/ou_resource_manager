import React, { useState, useEffect } from 'react';
import '../../Components/css/style.css';
import DisplayCard from '../../Components/DisplayCard';
import ItemDescriptionCard from '../../Components/ItemDescriptionCard';
import './resource.css';
import { ResourcifyApi } from '../../Authentification/ResourcifyApi';

const CreateResource = () => {
    const [type, setType] = useState();
    const [resourceID, setresourceID] = useState();
    const [model, setmodel] = useState("");
    const [imageLink, setimageLink] = useState();
    const [salePrice, setSalePrice] = useState("");
    const [borrowFee, setBorrowFee] = useState("");
    const [name, setname] = useState();
    const [createEdit, setcreateEdit] = useState();
    const [error, seterror] = useState();

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
      e.preventDefault();
      console.log({
        request_type: createEdit,
        resource_category: type.toUpperCase(),
        name: name,
        description: "",
        image: imageLink.name,
        model_number: model,
        borrow_price: borrowFee,
        sale_price: salePrice,
      })
      ResourcifyApi.createOrEditResource({
        request_type: createEdit,
        resource_category: type.toUpperCase(),
        name: name,
        description: "",
        image: imageLink.name,
        model_number: model,
        borrow_price: borrowFee,
        sale_price: salePrice,
      }).then(res=>{
         setType("")
        setresourceID("")
        setmodel("")
        setimageLink("")
        setSalePrice("")
        setBorrowFee("")
        setname("")
        setcreateEdit("")
        seterror("Resource Saved")
      }).catch(e=>{
        seterror("Resource Failed to Save");
      })

    }
    
    return ( 
    <div className="admin-outer">
      <div className="admin-toprow">
        <div className="form-container">
          <h2>Create/Edit Resource</h2>
          {error && <p>{error}</p>}
          <form id="resourceForm" onSubmit={handleSubmit}>
          <div className="radio-field-box">
            <label><input type="radio" value="create" name="type" onClick={e => setcreateEdit(e.target.value)}/>Create Resource</label>
            <label><input type="radio" value="edit" name="type" onClick={e => setcreateEdit(e.target.value)}/>Edit Resource</label>
          </div>
          <p>Resource Type:</p>
          <div className="resource-select">
            <select from="resourceForm" onChange={(e) => {setType(e.target.value)}}>
                <option value="DESKTOP">Desktop</option>
                <option value="LAPTOP">Laptop</option>
                <option value="TABLET">Tablet</option>
                <option value="PROJECTOR">Projector</option>
                <option value="CAMERA">Camera</option>
                <option value="CALCULATOR">Calculator</option>
            </select>
          </div>
          <div className="text-field-box">
            <input type="text" value={name} onChange={(e) => {setname(e.target.value)}}/>
            <label>Resource Name</label>
          </div>
          <div className="text-field-box">
            {createEdit === "create" ? <input type="text" value={resourceID} onChange={(e) => {setresourceID(e.target.value)}}/> : <input value="" disabled={true}></input>}
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
          <img src = {preview}></img>
          <ItemDescriptionCard json={{
            model: model,
            salePrice: salePrice,
            borrowFee: borrowFee,
            image: preview
            }}/>
          </DisplayCard>
        </div>
      </div>
      </div>
    );
}
 
export default CreateResource;