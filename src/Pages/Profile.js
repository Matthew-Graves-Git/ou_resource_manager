import React, { useState, useEffect} from 'react';
import '../Pages/profile.css';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [historyType, setHistoryType] = useState("rent");
    const [newPassword, setnewPassword] = useState("");
    const [currentPassword, setcurrentPassword] = useState("");
    const [verifyPassword, setverifyPassword] = useState("");
    const [user, setuser] = useState(null);
    const [name, setname] = useState("");
    const [items, setitems] = useState();
    const [error, seterror] = useState(null);
    const [itemsError, setitemsError] = useState(null);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        seterror(null);
        setcurrentPassword("")
        setnewPassword("")
        setverifyPassword("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newPassword !== verifyPassword){
            seterror("new password and repeat password does not match")
            return;
        }
        if(newPassword === currentPassword){
            seterror("new password and current password must not match")
            return;
        }
        await ResourcifyApi.updatePassword({
            current_password:currentPassword,
            new_password:newPassword
        }).then((res) =>{
            console.log(res)
            seterror("Password Updated")
        }).catch((e)=>{
            console.log(e)
            seterror("Password Failed to Update")
        })

    }

    useEffect(() => {
        const all =[];
        const getUserInfo = async() => {
            ResourcifyApi.getUser()
            .then((res)=>{
                setuser(res.data.availableFunds);
                if(res.data.firstname)
                    setname(res.data.firstname);
                else{
                    setname(res.data.username);
                }
            })
        }
        getUserInfo();
        if(historyType === "rent"){
            ResourcifyApi.getBorrowed()
            .then((res) =>{
                res.data.forEach((item)=>{
                    all.push({
                        name: item.resource.name,
                        price: item.resource.salePrice,
                        role: [item.resource.resourceId,item.resource.resourceCategory]
                         })
                })
                setitems(all)
                setitemsError(null)
            })
            .catch((e)=>{setitemsError("No Items Borrowed")})

        }else{
            ResourcifyApi.getPurchased()
            .then((res) =>{
                console.log(res)
                res.data.forEach((item)=>{
                    all.push({
                        name: item.resource.name,
                        price: item.resource.salePrice,
                        role: [item.resource.resourceId,item.resource.resourceCategory]
                         })
                })
                setitems(all)
                setitemsError(null)
            })
            .catch((e)=>{setitemsError("No Items Purchased")})
        }

         
    }, [historyType]);

     

    return ( 
        <div className="content">
            <h1>My Account</h1>
            <div className="profile-content">
                <div className="profile-section">
                    <p><b>Funds available:</b> ${user}</p>
                    <div className="history-select">
                        <b>History:</b>
                        <select from="history" onChange={(e) => {setHistoryType(e.target.value)}}>
                            <option value="rent">Current Rentals</option>
                            <option value="buy">Purchase History</option>
                        </select>
                    </div>
                    <button className="button" onClick={openModal}>Change Password</button>
                </div>
                <div class="profile-section">
                    {historyType === 'buy' ? 
                    (<div className="history-list">
                        <p><b>Purchased Item</b></p>
                        {itemsError && <p>{itemsError}</p>}
                        {items && items.map((item) =>{return(
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> {item.name}
                            </div>
                            <div className="field">
                                <label>Price:</label> ${item.price};
                            </div>
                        </div>
                        )})}
                        
                    </div>) 
                    : 
                    (<div className="history-list">
                        <p><b>Current Rentals</b></p>
                        {itemsError && <p>{itemsError}</p>}
                        {items && items.map((item) =>{return(
                        <div className="items">
                            <div className="field">
                                <label>Item Name:</label> {item.name}
                            </div>
                            <div className="field">
                                <label>Price:</label> ${item.price};
                            </div>
                        </div>
                        )})}
                    </div>)}
                </div>
            </div>

            {isOpen && (
                <>
                    <div className="overlay"></div>
                    <div className="modal form-container">
                        {error && <p>{error}</p>}
                        <div className="modal-header">
                            <h2>Change Password</h2>
                            <button onClick={closeModal} className="close-button">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="text-field-box">
                            <input type="password" value={currentPassword} onChange={(e)=>setcurrentPassword(e.target.value)}/>
                            <label>Current Password</label>
                        </div>
                        <div className="text-field-box">
                            <input type="password" value={newPassword} onChange={(e)=>setnewPassword(e.target.value)}/>
                            <label>New Password</label>
                        </div>
                        <div className="text-field-box">
                            <input type="password" value={verifyPassword} onChange={(e)=>setverifyPassword(e.target.value)}/>
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