import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import './home.css'
import '../Components/css/style.css';
import { IsAdmin } from '../Authentification/SecureRoute';

const Home = (props) => {
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
     getResources('ALL');
  }, [cred] );

  return (
    <div>
      <div>
        <header className="header">
          <h1>Resource Store & Rental</h1>
          <h2>Providing Students & Faculty With Products to Fulfill Technology Needs!</h2>
        </header>
        <div className="content">
          <div className="home-content">
            <div className="content-row">
              <h3>Store Information</h3>
              <p><b>Location:</b> 444 S. Cedros Ave<br /> Solana Beach, California</p>
               <p><b>Operating hours:</b> 8am - 6pm, Monday to Saturday</p>
            </div>

            <div className="content-row">
              <h3>Basic Information</h3>
              <ul className="information">
                <li>You can only add funds in person at our store.</li>
                <li>You can only borrow 3 items at a time.</li>
              </ul>
            </div>
          </div>
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

export default Home;