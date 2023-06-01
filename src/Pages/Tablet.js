import React, { useState, useEffect } from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';


const Tablet = (props) => {
    
    console.log(props.assets.cat)
  return (
    <div className='hole'>
      {props.assets.items.map((item) => {return (
      <DisplayCard key={item.model} className='temp'>
      <img  alt= {item.name}src = {item.image}></img>
      <ItemDescriptionCard json={item}/>
      <button className='Item-button'onClick={() => props.assets.handleRent(item.model, props.assets.cat)}>+ Rent</button>
      </DisplayCard>
    )})}
    </div>
  );
}
 
export default Tablet;