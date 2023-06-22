import React, { useState} from 'react';
import DisplayCard from '../Components/DisplayCard';
import ItemDescriptionCard from '../Components/ItemDescriptionCard';
import { ResourcifyApi } from '../Authentification/ResourcifyApi';

const Return = () => {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    
    const images = importAll(require.context('../Images', false, /\.(png|gif|jpe?g|svg)$/));
    const [user, setuser] = useState(null);
    const [error, seterror] = useState(null);
    const [items, setItems] = useState(null);
    const [deduction, setdeduction] = useState(0);
 

    const loadUser = async (e) => {
        e.preventDefault()
        const all = []; 
        ResourcifyApi.getItemsByUsername({username:user})
        .then(res=>{
            console.log(res);
            res.data.forEach( async (item) => {
                //const stock = await getResourceQty(item.resourceId)
                all.push({
                  name: item.resource.name,
                  model: item.resource.modelNumber,
                  price: item.resource.borrowPrice,
                  stock: 1,
                  image: images[item.resource.image],
                  role: [item.resource.resourceId,item.resource.resourceCategory],
                  item: item.itemId
                })
            });
            console.log(all)
            setItems(all);
            seterror(null);
        }).catch(e=>{
            seterror(`No Items For Rent By ${user}`)
            setItems(null);
        })
    }

    const returnItem = async (e) => {
        let all = items;
        const itemId = e.target.id;
        e.preventDefault()
        console.log(e.target.getAttribute('item'))
        console.log({
            item_id: e.target.id,
            resource_id: e.target.getAttribute('item')
        })
        ResourcifyApi.returnItem({
            item_id: e.target.id,
            resource_id: parseInt(e.target.item)
        }).then(res=>{
        }).catch(e=>{
            
            all = all.filter((item)=>{return item.item != itemId })
            console.log(all)
            setItems(all);
        })
        
    }
     
    


    return ( 
    <div className="content">
        <h2>Return</h2>
        {error && <p>{error}</p>}
        <form id="find-username" className="find-username" onSubmit={loadUser}>
            <label>Username:</label>
            <input type="text" value={user} onChange={e=>setuser(e.target.value)}></input>
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
                        <p className="Item-text">Model: {item.model}</p>
                    </div>
                    <div className="buttons-field">
                        <button className='Item-button' id={item.item} item={item.role[0]} onClick={returnItem}>Return Good</button>
                        <button className='Item-button' id={item.item} item={item.role[0]} onClick={returnItem}>Return Damaged</button><input type="number" placeholder="Amount" onChange={e=>{setdeduction(e.target.value)}}></input>
                        <button className='Item-button' id={item.item} item={item.role[0]} onClick={returnItem}>Lost or Destroyed Item</button><input type="number" placeholder="Amount" onChange={e=>{setdeduction(e.target.value)}}></input>
                    </div>
                    </DisplayCard>
                    </div>
                    )})}
                </div>
            </div>
        </div>
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    </div>
    );
}
 
export default Return;