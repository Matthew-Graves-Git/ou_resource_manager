import { useState } from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';

const Cart = (props) => {
    
    return (
        <div className='cartContainer'>
        <p>
            Your Cart
        </p>
        <section className='hole'>
          {props.assets.cart.map((item) => {return (
          <DisplayCard key={item.model} className='temp'>
          <img  alt= {item.name}src = {item.image}></img>
          <ItemDescriptionCard json={item}/>
          </DisplayCard>
        )})}
        </section>
        <section>
        <DisplayCard className='temp'>
          <p>
          {`Total: $${props.assets.total}.00`}
        </p>
        </DisplayCard>
        </section>
        </div>
      );
}
 
export default Cart;