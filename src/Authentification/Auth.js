import React, { Children,useState,useEffect, useContext, createContext } from 'react'
import { ResourcifyApi } from './ResourcifyApi';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null);
    const [roles, setroles] = useState(null);
    useEffect(() => {
        const users = localStorage.getItem('user')
        setuser(users);
        const roles = localStorage.getItem('role')
        setuser(roles);
    }, [user,roles]);
    
    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }
    
    const userIsAuthenticated = () => {
        return localStorage.getItem('user') !== null
    }
    
    const userLogin = async user => {
        IsAdminAcc();
        localStorage.setItem('user', JSON.stringify(user))
        setuser(user);
    }
    
    const userLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setuser(null);
    }

    const IsAdminAcc =  async () => {
        try{
        const admin = await ResourcifyApi.IsAdmin()
        localStorage.setItem('role', "true")
        setroles("true")
        return;
        } catch(e){
            localStorage.setItem('role', "false")
            setroles("false")
            return;
        }
    }




    return (
        <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userLogin, userLogout }}>
          {children}
        </AuthContext.Provider>
      )
}
 
export default AuthContext;


export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }