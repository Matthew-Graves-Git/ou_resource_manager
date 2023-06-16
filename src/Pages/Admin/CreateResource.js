import React, { useState, useEffect } from 'react';
import '../../Components/css/style.css';
import '../login.css'
import DisplayCard from '../../Components/DisplayCard';
import ItemDescriptionCard from '../../Components/ItemDescriptionCard';



const CreateResource = () => {
    const [resouceName, setresouceName] = useState();
    const [model, setmodel] = useState();
    const [description, setDescription] = useState();
    const [imageLink, setimageLink] = useState();
    const [numAvailible, setnumAvailible] = useState(1);
    const [borrowPeriod, setborrowPeriod] = useState();
    const [price, setPrice] = useState(0);
    const [preview, setPreview] = useState();
    const [type, setType] = useState();

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
    <div className='createResourcesContainer'>  
    <section>  
        <div className="login-box">
        <h2>Create Resource</h2>
        {/* {error && revealErr()} */}
        <form id="resourceForm" onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" value={resouceName} onChange={(e) => {setresouceName(e.target.value)}}/>
            <label>Resource Name</label>
          </div>
          <div className="user-box">
            <input type="text" value={model} onChange={(e) => {setmodel(e.target.value)}}/>
            <label>Model #</label>
          </div>
          <div className="user-box">
            <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
            <label>Description</label>
          </div>
          <div className="user-box">
            <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}}/>
            <label>Price</label>
          </div>
          <div className="user-box">
            <input type="number" min="1" max="100" step= "1" value={numAvailible} onChange={(e) => {setnumAvailible(e.target.value)}}/>
            <label>Availible</label>
          </div>
          <div className="user-box">
            <input type="file"  accept="image/*" placeholder="Upload an Image" required  onChange={(e) => {setimageLink(e.target.files[0])}}/>
            <label>Image</label>
          </div>

          
            <select from="resourceForm" onChange={(e) => {setborrowPeriod(e.target.value)}}>
                <option value="day">1 day</option>
                <option value="week">1 week</option>
                <option value="twoWeek">2 weeks</option>
                <option value="month">1 month</option>
                <option value="semester">1 semester</option>
            </select>
            <select from="resourceForm" onChange={(e) => {setType(e.target.value)}}>
                <option value="laptop">laptop</option>
                <option value="pc">pc</option>
                <option value="Accesories">accesorie</option>
                <option value="Tablet">tablet</option>
            </select>
          <button type="submit" className="button">Create</button>
        </form>
      </div>
      </section>
      <section>    
      <DisplayCard key={model} className='temp'>
      <img  alt= {resouceName}src = {preview}></img>
      <ItemDescriptionCard json={{
          name: resouceName,
            model: model,
            price: price,
            stock: numAvailible + " Availible",
            image: preview
      }}/>
      </DisplayCard>
      </section>  
      </div> 
    );
}
 
export default CreateResource;