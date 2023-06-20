import React, { useState ,Children} from 'react';
import './css/style.css';

const DisplayCard = ({children}) => {
    const childrenArray = Children.toArray(children);
    
    return (
        <div className='Container'>
            {Children.map(childrenArray, (child, index) =>{
                if (index === 0) {
                    return <div className='Image-container' key = {index}>{child}</div>
                }
                else if (child.type === 'button') {
                    return child;
                }
                else {
                    return <div className='Text-container' key = {index}>{child} </div>
                }
            })}
        </div>
    );
}
 
export default DisplayCard;