import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
    <footer className="footer-distributed">
        <div className="footer-left">
            <h3><span>Maple</span>University</h3>
            <p className="footer-links">
              <Link to="/Home">Home</Link>
              <Link to="/PCs">PCs</Link>
              <Link to="/Tablets">Tablets</Link>
              <Link to="/Laptops">Laptops</Link>
              <Link to="/Accesories">Accessories</Link>
              <Link to="/Cart">Cart</Link>
            </p>
            <p className="footer-company-name">Maple University © {year}</p>
        </div>

        <div className="footer-center">
            <div>
            <i className="fa fa-map-marker"></i>
            <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
            </div>
            <div>
            <i className="fa fa-phone"></i>
            <p>+1.555.333.9999</p>
            </div>
            <div>
            <i className="fa fa-envelope"></i>
            <p><a href="mailto:support@mapleuniversity.com">support@mapleuniversity.com</a></p>
            </div>
        </div>

        <div className="footer-right">
            <p className="footer-company-about">
            <span>Operation Hour</span>
            8am - 6am, Monday to Saturday.
            </p>

            <div className="footer-icons">
                <a href="#">Privacy Notice</a>
                <a href="#">Terms & Conditions</a>
                <a href="#">Help</a>
            </div>
        </div>
    </footer>
    );
}

export default Footer;

