import React, { useState } from 'react';
import '../Navbar/navbar.css'
import './css/style.css';
import Item from './Item';


const ItemDescriptionCard = (props) => {
    const [availible, setAvailible] = useState(props.json.availible);
    return(
        <div className='ItemDescriptionCard'>
            {Object.entries(props.json).map(([propName,propData]) => {
                if(propName !== 'stockSale')
                return <Item key = {propName} item={propName} data = {propData}></Item>
            })}
            
        </div>
    );
}
 
export default ItemDescriptionCard;