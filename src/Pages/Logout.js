import {useEffect, useContext } from 'react';
import AuthContext, { AuthProvider } from '../Authentification/Auth';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        Auth.userLogout();
        navigate("/Home")
    },[])
}
 
export default Logout;