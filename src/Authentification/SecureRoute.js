import React , {Children} from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth';

const SecureRoute = ({children}) => {
  const { userIsAuthenticated } = useAuth()
  return userIsAuthenticated() ? children : <Navigate to="/" />
}

export default SecureRoute