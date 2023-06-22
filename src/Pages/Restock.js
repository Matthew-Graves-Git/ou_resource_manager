import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const Restock = (props) => {
const location = useLocation()
const [serial, setserial] = useState("");
const [id, setid] = useState(null);
const [name, setname] = useState(null);
const [type, settype] = useState("SALE");

useEffect(() => {
  console.log(location.state)
  if(location.state){
    console.log(location.state)
    setid(location.state.id);
    setname(location.state.name);
  } 
}, []);

const restockItem = async (e) => {
  e.preventDefault();
  ResourcifyApi.restockItem({
    resource_id: id,
    serial_number:serial,
    item_type:type
  }).then(res =>{
    console.log(res)
    setserial("")
  })
}
 

    return ( 
    <div className="content">
        <div className="form-container">
        <h2>Restock</h2>
        <form onSubmit={restockItem}>
          <div className="text-field-box">
            <label>Resource ID</label>
            {id?<p>{id}</p>:<p>Click A "Restock" Button</p>}
          </div>
          <div className="text-field-box">
            <label>Resource Name</label>
            {name?<p>{name}</p>:<p>Click A "Restock" Button</p>}
          </div>
          <div className="text-field-box">
            <input type="number" value={serial} onChange={e=>setserial(e.target.value)}/>
            <label>Serial Number of Item You Are Adding:</label>
          </div>
          <div className="radio-field-box">
                <label><input type="radio" value="sales" onClick={e=>settype("SALE")} name="type" checked />For Sale</label>
                <label><input type="radio" value="rent" name="type" onClick={e=>settype("BORROW")}/>For Borrowing</label>


          </div>
          <div class="button-field">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
    );
}
 
export default Restock;