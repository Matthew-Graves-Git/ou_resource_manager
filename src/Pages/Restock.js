import React, { useState} from 'react';

const Restock = () => {
    return ( 
    <div className="content">
        <div className="form-container">
        <h2>Restock</h2>
        <form onSubmit="">
          <div className="text-field-box">
            <label>Resource ID</label>
            <p>Click A "Restock" Button</p>
          </div>
          <div className="text-field-box">
            <label>Resource Name</label>
            <p>Click A "Restock" Button</p>
          </div>
          <div className="text-field-box">
            <input type="number" value="" onChange=""/>
            <label>Serial Number of Item You Are Adding:</label>
          </div>
          <div className="radio-field-box">
                <label><input type="radio" value="sales" name="type" checked />For Sale</label>
                <label><input type="radio" value="rent" name="type" />For Borrowing</label>
          </div>
          <div class="button-field">
            <button type="submit" className="button">Submit</button>
          </div>
        </form>
      </div>
    </div>
    );
}
 
export default Restock;