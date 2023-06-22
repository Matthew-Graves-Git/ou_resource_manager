import React, { useState, useEffect } from 'react';
import './home.css'
import '../Components/css/style.css';

const Home = (props) => {
  return (
    <div>
      <div>
        <header className="header">
          <h1>Resource Store & Rental</h1>
          <h2>Providing Students & Faculty With Products to Fulfill Technology Needs!</h2>
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
                <li>All prices include tax!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;