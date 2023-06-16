import {Link} from 'react-router-dom';
import React from 'react';
import cart from '../Images/shopping-cart.png';
import './navbar.css'
import { IsAdmin } from '../Authentification/SecureRoute';
const NavBar = () => {


    return (  
        <nav className="navbar">
            <div className="links">
                <Link to="/Home">All</Link>
                <Link to="/PCs">PCs</Link>
                <Link to="/Tablets">Tablets</Link>
                <Link to="/Accesories">Accesories</Link>
                <Link to="/Laptops">Laptops</Link>
                <Link to="/Cart">
                    <img alt='cart' src={cart}/>
                </Link>
                {IsAdmin()}
            </div>
        </nav>
    );
}
 
export default NavBar;