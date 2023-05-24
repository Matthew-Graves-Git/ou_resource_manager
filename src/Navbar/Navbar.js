import {Link} from 'react-router-dom';
import cart from '../Images/shopping-cart.png';
const NavBar = () => {
    return (  
        <nav className="navbar">
            <div className="links">
                <Link to="/">All</Link>
                <Link to="/Laptops">
                    <img alt='cart' src={cart}/>
                </Link>
                {/* //<Link to="/Pc">PC</Link> */}
            </div>
        </nav>
    );
}
 
export default NavBar;