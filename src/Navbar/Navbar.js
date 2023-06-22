import {Link} from 'react-router-dom';
import React from 'react';
import cart from '../Images/red-shopping-cart.png';
import './navbar.css'
import { IsAdmin } from '../Authentification/SecureRoute';
const NavBar = (param) => {

  return (
      <header>
        <nav>
          <div className="logo">
            <img src={require('../Images/logo.jpeg')} alt="website logo" />
          </div>
          {param.isLoginPage == "false" ? <>
          <ul className="menu-item menu-item-left">
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/PCs">PCs</Link></li>
              <li><Link to="/Tablets">Tablets</Link></li>
              <li><Link to="/Laptops">Laptops</Link></li>
              <li><Link to="/Accesories">Accessories</Link></li>
              <li><Link to="/Cart"><img className="cart" alt='cart' src={cart}/></Link></li>
          </ul>
            
          <ul className="menu-item menu-item-right">
          {IsAdmin() ?
            <li className="dropdown">
              <div className="dropbtn">Admin
                <i className="fa fa-caret-down"></i>
              </div>
              <div className="dropdown-content">
                <li><Link to="/CreateResource">Resource</Link></li>
                <li><Link to="/Funds">Add Funds</Link></li>
                <li><Link to="/Return">Return</Link></li>
                <li><Link to="/Restock">Restock</Link></li>
              </div>
            </li> : <></>}
            <li><Link to="/Profile">Account</Link></li>
            <li><Link to="/Logout">Logout</Link></li>
          </ul></> : <div className="header-name"><h1>Maple University</h1></div> }
        </nav>
      </header>
  );
}
 
export default NavBar;