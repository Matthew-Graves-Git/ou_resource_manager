import React , {Children, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth';
import { ResourcifyApi } from './ResourcifyApi';



const SecureRoute = ({children}) => {
  const { userIsAuthenticated } = useAuth()
  return userIsAuthenticated() ? children : <Navigate to="/" />
}

// const IsAdmin =  () => {
//   const [A, setA] = useState(null);
//   useEffect(() => {
//     const x = async () =>{
//       await ResourcifyApi.IsAdmin()
//       .then(response => {
//         setA(true)
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     }
//     x();
//   }, []);

//     return(<>{A && <><li><Link to="/CreateResource">Resource</Link></li>
//     <li><Link to="/Funds">Add Funds</Link></li>
//     <li><Link to="/Return">Return</Link></li>
//     <li><Link to="/Restock">Restock</Link></li></>}</>)
// }

const IsAdmin =  () => {
  const [A, setA] = useState(false);
  useEffect(() => {
    const x = async () =>{
      await ResourcifyApi.IsAdmin()
      .then(response => {
        setA(true)
      })
      .catch((e) => {
        console.log(e);
      });
    }
    x();
  }, []);

    return A;
}

export {IsAdmin,SecureRoute};

