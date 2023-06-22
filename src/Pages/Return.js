import React, { useState} from 'react';
import DisplayCard from '../Components/DisplayCard';

const Return = () => {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    
    const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));


    const [items, setItems] = useState([
        {
            name: "Item 1",
            model: "Item 1 Model",
            price: "100",
            stock: 1,
            image: images["acc-1.png"],
            role: [123,1]
        },
        {
            name: "Item 2",
            model: "Item 2 Model",
            price: "200",
            stock: 2,
            image: images["laptop.png"],
            role: [123,1]
        },
        {
            name: "Item 3",
            model: "Item 3 Model",
            price: "300",
            stock: 3,
            image: images["tablet-2.png"],
            role: [123,1]
        }
    ]);

    return ( 
    <div className="content">
        <h2>Return</h2>
        <form id="find-username" className="find-username" onSubmit="">
            <label>Username:</label>
            <input type="text" value="" ></input>
            <button type="submit">Find</button>
        </form>
        <div className='return-list'>
            <div className='hole'>
                <div className="row">
                    {items && items.map((item) => {return (
                    <div className="column">
                    <DisplayCard key={item.model} className='temp'>
                    <img alt={item.name} src={item.image}></img>
                    <div className='ItemDescriptionCard'>
                        <p className="Item-text"><b>{item.name}</b></p>
                        <p className="Item-text">{item.model}</p>
                    </div>
                    <div className="buttons-field">
                        <button className='Item-button'>Return Good</button>
                        <button className='Item-button'>Return Damaged</button><input type="number" placeholder="Amount"></input>
                        <button className='Item-button'>Lost or Destroyed Item</button><input type="number" placeholder="Amount"></input>
                    </div>
                    </DisplayCard>
                    </div>
                    )})}
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Return;