import React, { useState} from 'react';

const Restock = () => {
    return ( 
    <div className="content">
        <div className="form-container">
        <h2>Restock</h2>
        <form onSubmit="">
          <div className="text-field-box">
            <label>Resource ID</label>
            <p>123456</p>
          </div>
          <div className="text-field-box">
            <label>Serial Number</label>
            <p>123456</p>
          </div>
          <div className="text-field-box">
            <input type="number" value="" onChange=""/>
            <label>Quantity</label>
          </div>
          <div className="radio-field-box">
                <label><input type="radio" value="sales" name="type" checked /> Sales</label>
                <label><input type="radio" value="rent" name="type" /> Rent</label>
          </div>
          <div className="button-field">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
    );
}
 
export default Restock;