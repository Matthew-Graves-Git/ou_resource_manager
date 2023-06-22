import React, { useState} from 'react';
import '../Pages/profile.css';
import DisplayCard from '../Components/DisplayCard';

const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [historyType, setHistoryType] = useState("rent");

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

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
            image: images["tablet-2.png"],
            role: [123,1]
        },
        {
            name: "Item 2",
            model: "Item 2 Model",
            price: "200",
            stock: 2,
            image: images["acc-1.png"],
            role: [123,1]
        },
        {
            name: "Item 3",
            model: "Item 3 Model",
            price: "300",
            stock: 3,
            image: images["laptop.png"],
            role: [123,1]
        }
    ]);

    return ( 
        <div className="content">
            <h1>Account</h1>
            <div className="profile-content">
                <div className="profile-section">
                    <button className="button" onClick={openModal}>Change Password</button>
                    <p><span className="funds">Funds available: </span><span className="fund-amount">$100</span></p>
                </div>
                <div className="history-section">
                    <div className="history-select">
                        <b>View:</b>
                        <select from="history" onChange={(e) => {setHistoryType(e.target.value)}}>
                            <option value="rent">Borrowed Items</option>
                            <option value="buy">Purchased Items</option>
                        </select>
                    </div>
                    {historyType === 'buy' ? 
                    (<div className="history-list">
                        <h2><b>Purchased Item</b></h2>
                        <div className='hole'>
                            <div className="row">
                                {items && items.map((item) => {return (
                                <div className="column">
                                <DisplayCard key={item.model} className='temp'>
                                <img alt={item.name} src={item.image}></img>
                                <div className='ItemDescriptionCard'>
                                    <p className="Item-text"><b>{item.name}</b></p>
                                    <p className="Item-text">{item.model}</p>
                                    <p className="price">${item.price}</p>
                                </div>
                                </DisplayCard>
                                </div>
                                )})}
                            </div>
                        </div>
                    </div>) 
                    : 
                    (<div className="history-list">
                        <h2><b>Borrowed Item</b></h2>
                        <div className='hole'>
                            <div className="row">
                                {items && items.map((item) => {return (
                                <div className="column">
                                <DisplayCard key={item.model} className='temp'>
                                <img alt={item.name} src={item.image}></img>
                                <div className='ItemDescriptionCard'>
                                    <p className="Item-text"><b>{item.name}</b></p>
                                    <p className="Item-text">{item.model}</p>
                                    <p className="price">${item.price}</p>
                                </div>
                                </DisplayCard>
                                </div>
                                )})}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>

            {isOpen && (
                <>
                    <div className="overlay"></div>
                    <div className="modal form-container">
                        <div className="modal-header">
                            <h2>Change Password</h2>
                            <button onClick={closeModal} className="close-button">&times;</button>
                        </div>
                        <form onSubmit="">
                        <div className="text-field-box">
                            <input type="password" value="" onChange=""/>
                            <label>Current Password</label>
                        </div>
                        <div className="text-field-box">
                            <input type="password" value="" onChange=""/>
                            <label>New Password</label>
                        </div>
                        <div className="text-field-box">
                            <input type="password" value="" onChange=""/>
                            <label>Repeat Password</label>
                        </div>
                        <div className="button-field">
                            <button type="submit" className="button">Submit</button>
                        </div>
                        </form>
                    </div>
                </>
            )}

        </div>
      );
}
 
export default Profile;