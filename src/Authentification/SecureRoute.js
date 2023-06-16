import React , {Children, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth';
import { ResourcifyApi } from './ResourcifyApi';



const SecureRoute = ({children}) => {
  const { userIsAuthenticated } = useAuth()
  return userIsAuthenticated() ? children : <Navigate to="/" />
}

const IsAdmin =  () => {
  const [A, setA] = useState(null);
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

    return(<>{A && <Link to="/CreateResource">Resource</Link>}</>)


}
 
export {IsAdmin,SecureRoute};

