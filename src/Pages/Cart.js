import { useState ,useEffect } from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const Cart = (props) => {
    const [currentCart,setCurrentCart] = useState(null)
    const [total,setTotal] = useState(0)
    const [type, setType] = useState();
    const [date, setdate] = useState(new Date());
    const [tom, settom] = useState(new Date());
    const [last, setlast] = useState((((new Date()).setDate(date.getDay() + 2))));
    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }
  
    const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));

    const clearCart =  async () => {
      try{
      const all = currentCart;
      const ids = []
      all.forEach((item) =>{
        ids.push({resource_id: `${item.role[0]}` })
      })
      const cart = await ResourcifyApi.deleteAllCart(ids)
      setCurrentCart([])
      setTotal(0)
      }catch(e){

      }
    }

    const removeItem =  async (item) => {
      const ids  = [{resource_id: `${item}` }]
      const tempCart = currentCart;
      const result = tempCart.filter((items) => {
         return (item != items.role[0])
        })
        const newTotal = tempCart.filter((items) => {
          return (item == items.role[0])
         })
      const cart = await ResourcifyApi.deleteAllCart(ids)
      setCurrentCart(result)
    }

    const handleCheckout = async () =>{
      
      currentCart.forEach(async (item)=>{
        if(item.type === 'BORROW'){
          try{
        const temp = await ResourcifyApi.rent({
          resource_id:item.role[0],
          borrow_time:item.date
        })
        }catch(e){}
        
        }else{
          try{
         const y = await ResourcifyApi.purchase({
            resource_id:item.role[0]
          })
          }catch(e){}
        }
      }
      )
      clearCart()
      
      
    }

    const changePuchase = (e) => {
      const temp = currentCart;
      temp.forEach(item => {
        if(item.role[0] == e.target.id){
          item.type = e.target.value
        }
      })
      setCurrentCart(temp)
    }

    const changeDate = (e) => {
      const temp = currentCart;
      temp.forEach(item => {
        if(item.role[0] == e.target.id){
          item.date = (e.target.value * 24 * 60 * 60 * 1000 )
        }
      })
      setCurrentCart(temp)
    }
     

    useEffect(() => {
      const tomorrow = new Date(date);
      const tomorrow2 = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1)
      settom(tomorrow)
      tomorrow2.setDate(tomorrow2.getDate() + 2)
      setlast(tomorrow2)
      const all =[];
      let total = 0;
      const getSavedCart = async () =>{
        const cart = await ResourcifyApi.getCart()
        cart.data.forEach( async (item) => {
          //const stock = await getResourceQty(item.resourceId)
          all.push({
            name: item.name,
            model: item.modelNumber,
            price: item.borrowPrice,
            salePrice: item.salePrice,
            stock: 1,
            image: images[item.image],
            role: [item.resourceId,item.resourceCategory],
            type:"BORROW",
            date: (1* 24 * 60 * 60 * 1000)
          })
          total+=item.borrowPrice;
        });
        setTotal(total)
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
              <select from="resourceForm" className='optionsForm' id={item.role[0]} onChange={changePuchase} >
                <option value="BORROW">Rent</option>
                <option value="SALE">Purchase</option>
            </select>
            <select from="resourceForm" id={item.role[0]} onChange={changeDate} >
                <option value="1">{date.toLocaleDateString('en-US')}</option>
                <option value="2">{tom.toLocaleDateString('en-US')}</option>
                <option value="3">{last.toLocaleDateString('en-US')}</option>
            </select>
              <div className="prices">
                <div className="price">Borrow ${item.price}</div>
                <div className="price">Buy ${item.salePrice}</div>
                <div className="remove" id={item.role[0]} onClick={(e) => removeItem(e.target.id)}><a  id={item.role[0]} onClick={(e) => removeItem(e.target.id)} href='#'>Remove</a></div>
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
                <div className="total-amount">{`Total: $${total}`}</div>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
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