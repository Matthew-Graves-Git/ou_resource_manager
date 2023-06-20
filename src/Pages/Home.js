import React from 'react';
import {Link} from 'react-router-dom';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import './home.css'
import '../Components/css/style.css';

const Home = (props) => {
    return (
        <div>
            <header className="header">
                <h1>Welcome to Maple University</h1>
                <h2>We provide various products to fulfill technology needs.</h2>

                <a href="#all_products">
                    <button><b>Explore Product</b></button>
                </a>
            </header>
            <div className="content">
                <h1 id="all_products">All Products</h1>
                <div className='filter'>
                        <input type="text" placeholder="Search product"/><button>Search</button>
                        <div className="filterMenu">
                            <button className="selected">All</button>
                            <Link to="/PCs"><button>PC</button></Link>
                            <Link to="/Laptops"><button>Laptops</button></Link>
                            <Link to="/Tablets"><button>Tablets</button></Link>
                            <Link to="/Accesories"><button>Accessories</button></Link>
                        </div>
                </div>

                <div className='hole'>
                    <div className="row">
                    {props.assets.items.map((item) => {return (
                    <div className="column">
                    <DisplayCard key={item.model} className='temp'>
                    <img alt={item.name} src={item.image}></img>
                    <ItemDescriptionCard json={item}/>
                    <button className='Item-button'>Buy</button>
                    <button className='Item-button'onClick={() => props.assets.handleRent(item.model, props.assets.cat)}>Rent</button>
                    </DisplayCard>
                    </div>
                    )})}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;