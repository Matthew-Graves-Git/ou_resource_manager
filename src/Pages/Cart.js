import { useState ,useEffect } from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';

const Cart = (props) => {
    const [currentCart,setCurrentCart] = useState(null)

    const clearCart =  () => {
      localStorage.removeItem("savedCart");
      setCurrentCart(null)
      props.assets.clearSessionCart()
    }

    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("savedCart"));
      if(savedCart){
        setCurrentCart(savedCart);
      }else{
        setCurrentCart(null);
      }
    }, [props.assets.cart]);


    return (
        <div className='cartContainer'>
        <p>
            Your Cart
        </p>
        <section className='hole'>
          {currentCart && currentCart.map((item) => {
            return (
            <DisplayCard key={item.model} className='temp'>
            <img  alt= {item.name}src = {item.image}></img>
            <ItemDescriptionCard json={item}/>
            </DisplayCard>
          )})}
          {props.assets.cart.map((item) => {
          return (
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
        <button onClick={clearCart}>
          clearCart
        </button>
        </div>
      );
}
 
export default Cart;