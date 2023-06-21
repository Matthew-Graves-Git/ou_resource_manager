import React, { useState} from 'react';
import '../Pages/profile.css';

const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [historyType, setHistoryType] = useState("rent");

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return ( 
        <div className="content">
            <h1>My Account</h1>
            <div className="profile-content">
                <div className="profile-section">
                    <p><b>Funds available:</b> $100</p>
                    <div className="history-select">
                        <b>History:</b>
                        <select from="history" onChange={(e) => {setHistoryType(e.target.value)}}>
                            <option value="rent">Borrow History</option>
                            <option value="buy">Purchase History</option>
                        </select>
                    </div>
                    <button className="button" onClick={openModal}>Change Password</button>
                </div>
                <div class="profile-section">
                    {historyType === 'buy' ? 
                    (<div className="history-list">
                        <p><b>Purchased Item</b></p>
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> Name
                            </div>
                            <div className="field">
                                <label>Price:</label> $100
                            </div>
                        </div>
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> Name
                            </div>
                            <div className="field">
                                <label>Price:</label> $100
                            </div>
                        </div>
                    </div>) 
                    : 
                    (<div className="history-list">
                        <p><b>Borrowed Item</b></p>
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> Name
                            </div>
                            <div className="field">
                                <label>Price:</label> $100
                            </div>
                        </div>
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> Name
                            </div>
                            <div className="field">
                                <label>Price:</label> $100
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
                        <div class="button-field">
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