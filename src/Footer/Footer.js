import React from 'react';
import './footer.css'
const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
        {`Copyright © Maple University ${year}`}
        <div className="right"><a href="#">Contact Us</a> | <a href="#">Help</a></div>
        </footer>
    );
}

export default Footer;

