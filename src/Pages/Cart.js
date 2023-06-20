import { useState ,useEffect } from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const Cart = (props) => {
    const [currentCart,setCurrentCart] = useState(null)

    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }
  
    const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));

    const clearCart =  () => {
      localStorage.removeItem("savedCart");
      setCurrentCart(null)
      props.assets.clearSessionCart()
    }

    useEffect(() => {
      const all =[];
      const getSavedCart = async () =>{
        const cart = await ResourcifyApi.getCart()
        cart.data.forEach( async (item) => {
          //const stock = await getResourceQty(item.resourceId)
          all.push({
            name: item.name,
            model: item.modelNumber,
            price: item.borrowPrice,
            stock: 1,
            image: images[item.image],
            role: [item.resourceId,item.resourceCategory]
          })
        });
        setCurrentCart(all);
      };
      getSavedCart()
    }, []);


    return (
        <div className='content'>
          <div className='cart-container'>
            <div className="cart-header">
              <h1 className="heading">Your Cart</h1>
              <h5 className="action" onClick={clearCart}>Remove all</h5>
            </div>

            {currentCart && currentCart.map((item) => {
              return (
            <div className="cart-items">
              <div className="image-container">
                <img alt= {item.name} src={item.image}/>
              </div>
              <div className="about">
                <h2 className="title">{item.name}</h2>
                <h4 className="subtitle">{item.model_number}</h4>
              </div>
              <div className="counter">
                <div className="btn">+</div>
                <div className="count">1</div>
                <div className="btn">-</div>
              </div>
              <div className="prices">
                <div className="price">${item.borrow_price}</div>
                <div className="remove"><a href="#">Remove</a></div>
              </div>
            </div>
            )})}

            <hr /> 
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="Subtotal">Sub-Total</div>
                  <div className="items">{currentCart != null ? currentCart.length : 0} item(s)</div>
                </div>
                <div className="total-amount">{`Total: $${props.assets.total}.00`}</div>
              </div>
              <button>Checkout</button>
            </div>

          
            {/* {props.assets.cart.map((item) => {
            return (
            <DisplayCard key={item.model} className='temp'>
            <img  alt= {item.name}src = {item.image}></img>
            <ItemDescriptionCard json={item}/>
            </DisplayCard>
          )})} */}
          </div>
        </div>
      );
}
 
export default Cart;