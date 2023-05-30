import React, { Children,useState,useEffect, useContext, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null);
    useEffect(() => {
        const users = localStorage.getItem('user')
        setuser(users);
    }, [user]);
    
    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }
    
    const userIsAuthenticated = () => {
        return localStorage.getItem('user') !== null
    }
    
    const userLogin = user => {
        localStorage.setItem('user', JSON.stringify(user))
        setuser(user);
    }
    
    const userLogout = () => {
        localStorage.removeItem('user');
        setuser(null);
    }



    return (
        <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userLogin, userLogout, }}>
          {children}
        </AuthContext.Provider>
      )
}
 
export default AuthContext;


export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }