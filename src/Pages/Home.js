import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import './home.css'
import '../Components/css/style.css';
import { IsAdmin } from '../Authentification/SecureRoute';

const Home = (props) => {
  const [items,setItems] = useState([]);
  let cred = false

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
    
      const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));
  
    
    

    useEffect( () => {
      //postAll(laptops,"LAPTOP")
      //postAll(pc,"DESKTOP")
      // postAll(tablets,"TABLET")
      // postAll(accesorie,"CALCULATOR")
      
      const all = [];
      async function getResources(category){
        const resources = await ResourcifyApi.getAllItems({resource_category:category});
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
            <header className="header">
                <h1>Tech Store</h1>
                <h2>Providing students products to fulfill technology needs.</h2>

                <a href="#all_products">
                    <button><b>Explore Product</b></button>
                </a>
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
    );
}

export default Home;