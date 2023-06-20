import {Link} from 'react-router-dom';
import React from 'react';
import cart from '../Images/shopping-cart.png';
import './navbar.css'
import { IsAdmin } from '../Authentification/SecureRoute';
const NavBar = () => {


    return (
        <header>
          <nav>
            <div className="logo">
              <img src={require('../Images/logo.jpeg')} alt="website logo" />
            </div>
            <ul className="menu-item">
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/PCs">PCs</Link></li>
              <li><Link to="/Tablets">Tablets</Link></li>
              <li><Link to="/Laptops">Laptops</Link></li>
              <li><Link to="/Accesories">Accessories</Link></li>
              <li><Link to="/Cart">Cart</Link></li>
              {/* <li><Link to="/Cart"><img alt='cart' src={cart}/></Link></li> */}
              <li>{IsAdmin()}</li>
              <li><Link to="/Logout">Logout</Link></li>
            </ul>
          </nav>
        </header>
    );
}
 
export default NavBar;