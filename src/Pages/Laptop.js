import React from 'react';
import '../Components/css/style.css';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import {Link} from 'react-router-dom';

const Laptop = (props) => {
    
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
          {props.assets.items.map((item) => {return (
          <div className="column">
          <DisplayCard key={item.model} className='temp'>
          <img  alt= {item.name}src = {item.image}></img>
          <ItemDescriptionCard json={item}/>
          <button className='Item-button'>Buy</button>
          <button className='Item-button'onClick={() => props.assets.handleRent(item.model, props.assets.cat)}>Rent</button>
          </DisplayCard>
          </div>
        )})}
        </div>
      </div>
    </div>
  );
}
 
export default Laptop;