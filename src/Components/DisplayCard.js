import React, { useState ,Children} from 'react';
import './css/style.css';

const DisplayCard = ({children}) => {
    const childrenArray = Children.toArray(children);
    
    return (
        <div className='Container'>
            {Children.map(childrenArray, (child, index) =>{
                return <div className={ index === 0 ? 'Image-container':'Text-container'} key = {index}>{child} </div>
            })}
        </div>
    );
}
 
export default DisplayCard;