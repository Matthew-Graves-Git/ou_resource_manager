import React from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import placeholder from '../Images/placeholder-image.png';
import {Link} from 'react-router-dom';

const Product = (props) => {



  return (
    <div className='content'>
      <h1>All Products</h1>
      <div className='filter'>
            <input type="text" placeholder="Search product"/><button>Search</button>
            <div className="filterMenu">
                <button className="selected">All</button>
                <Link to="/Pens"><button>Pens</button></Link>
                <Link to="/Patches"><button>Patches</button></Link>
                <Link to="/Monitors"><button>Monitors</button></Link>
            </div>
      </div>

      <div className='hole'>
        <div className="row">
          {props.assets.items.map((item) => {return (
          <div className="column">
          <DisplayCard key={item.model} className='temp'>
          <img alt={item.name} src={item.image}></img>
          <ItemDescriptionCard json={item}/>
          <button className='Item-button'onClick={() => props.assets.handleRent(item.model, props.assets.cat)}>+ Rent</button>
          </DisplayCard>
          </div>
        )})}
        </div>
      </div>
    </div>
  );
}

 
export default Product;