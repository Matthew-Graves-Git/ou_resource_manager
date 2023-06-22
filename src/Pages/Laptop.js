import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import './home.css'
import '../Components/css/style.css';
import { IsAdmin } from '../Authentification/SecureRoute';

const Laptop = (props) => {
    let cred = false;

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));


const [items,setItems] = useState([]);

useEffect( () => {
    //postAll(laptops,"LAPTOP")
    //postAll(pc,"DESKTOP")
    // postAll(tablets,"TABLET")
    // postAll(accesorie,"CALCULATOR")
    const all = [];
    async function getResourceQty(id){
      const stock = await ResourcifyApi.getQty(id);
      return stock.data;
    }
    async function getResources(category){
      const resources = await ResourcifyApi.getAllItems({resource_category:category});
      if(resources){
        resources.data.forEach( async (item) => {
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
      }
        setItems(all);
    }
     getResources('LAPTOP');
  }, [] );

  return (
    <div className='content'>
      <h1>Laptops</h1>
      <div className='filter'>
            <input type="text" placeholder="Search product"/><button>Search</button>
            <div className="filterMenu">
                <Link to="/Home"><button>All</button></Link>
                <Link to="/PCs"><button>PC</button></Link>
                <button className="selected">Laptops</button>
                <Link to="/Tablets"><button>Tablets</button></Link>
                <Link to="/Accesories"><button>Accessories</button></Link>
            </div>
      </div>

      <div className='hole'>
                    <div className="row">
                    {cred = IsAdmin()}
                    {items && items.map((item) => {return (
                      
                    <div className="column">
                      {cred && <button className="restock"><Link to="/Restock">Restock</Link></button>}
                    <DisplayCard key={item.model} className='temp'>
                    <img alt={item.name} src={item.image}></img>
                    
                    <ItemDescriptionCard json={item}/>
                    
                    <button className='Item-button'>Buy</button>
                    <button className='Item-button'onClick={() => props.assets.handleRent(item.role,item.model, props.assets.cat)}>Rent</button>
                    
                    </DisplayCard>
                    </div>
                    )})}
                    </div>
                </div>
    </div>
  );
}
 
export default Laptop;