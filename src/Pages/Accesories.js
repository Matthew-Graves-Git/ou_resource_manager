import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import './home.css'
import '../Components/css/style.css';
import { IsAdmin } from '../Authentification/SecureRoute';

const Accesories = (props) => {
  let cred = IsAdmin();

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));

  const [items,setItems] = useState([]);

  useEffect( () => {
    const all = [];
    async function getResources(category){
      const resources = await ResourcifyApi.getResources({resource_category:category});
      if(resources){
        resources.data.forEach( async (item) => {
          //const stock = await getResourceQty(item.resourceId)
          all.push({
            name: item.name,
            model: item.modelNumber,
            price: item.borrowPrice,
            stock: item.quantityBorrow + item.quantitySale,
            stockSale: item.quantitySale,
            image: images[item.image],
            role: [item.resourceId,item.resourceCategory]
          })
        });
      }
      setItems(all);
    }
     getResources('CALCULATOR');
  }, [] );

  return (
    <div className='content'>
      <h1>Accessories</h1>
      <div className='filter'>
        <div className="filterMenu">
          <Link to="/PCs"><button>PC</button></Link>
          <Link to="/Laptops"><button>Laptops</button></Link>
          <Link to="/Tablets"><button>Tablets</button></Link>
          <button className="selected">Accessories</button>
        </div>
      </div>

      <div className='hole'>
        <div className="row">
          {items && items.map((item) => {return (
            <div className="column">
              {cred && <button className="restock"><Link to="/Restock" state={{ id: item.role[0], name:item.name}}>Restock</Link></button>}
              <DisplayCard key={item.model} className='temp'>
                <img alt={item.name} src={item.image}></img>
                    
                <ItemDescriptionCard json={item}/>
                <button className='Item-button'onClick={() => props.assets.handleRent(item.role,item.model, props.assets.cat)}>+ Add</button>
              </DisplayCard>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
 
export default Accesories;