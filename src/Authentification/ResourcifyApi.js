import axios from 'axios'
import { config } from './Constants'

export const ResourcifyApi = {
  authenticate,
  signup,
  basicAuth
}

function authenticate(username, password) {
  console.log('got to');
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  return instance.post('/login', params, {
    headers: { 'Content-type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function signup(user) {
  return instance.post('/login', user, {
    headers: { 'Content-type': 'application/json' },
  })
}


const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})


function basicAuth(user) {
  return `Basic ${user.authdata}`
}