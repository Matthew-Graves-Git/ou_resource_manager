import React, { useEffect, useState ,Children} from 'react';
import './css/style.css';
import { IsAdmin } from '../Authentification/SecureRoute';
import {Link} from 'react-router-dom';

const DisplayCard = ({children}) => {
    const childrenArray = Children.toArray(children);
    const [isAdmin, setIsAdmin] = useState(false);

    let admin = IsAdmin();

    useEffect(() => {
        if (admin && admin !== undefined && admin !== null) {
            setIsAdmin(admin);
        }
    }, [admin]);

    return (
        <div className='Container'>
            {Children.map(childrenArray, (child, index) =>{
                if (index === 0) {
                    return <div className='Image-container' key = {index}>{child}
                    {isAdmin ? <Link to="/CreateResource"><button className="edit-resource">Edit Resource</button></Link>: <></>}
                    </div>
                }
                else if (child.type === 'button') {
                    return child;
                }
                else if (Object.keys(child.props).length == 0) {
                    return <></>;
                }
                else {
                    return <div className='Text-container' key = {index}>{child} </div>
                }
            })}
        </div>
    );
}
 
export default DisplayCard;