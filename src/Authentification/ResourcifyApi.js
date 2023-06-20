import axios from 'axios'
import { config } from './Constants'

export const ResourcifyApi = {
  authenticate,
  signup,
  basicAuth,
  IsAdmin,
  getAllItems,
  getQty,
  createAll,
  addToCart,
  getCart,
  addFunds
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

function IsAdmin() {
  return instance.get('/demo/confirm', {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}
function addFunds(username,funds) {
  return instance.post('/demo/add/funds',
  {
    username:username,
    funds:funds
  }
  , {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getCart() {
  return instance.get('/demo/get/cart', {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function addToCart(id) {
  return instance.post('/demo/do/cart_add',{resource_id:id}, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}


function getAllItems(category) {
  return instance.post('/demo/get/resource', category, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getQty(id) {
  return instance.post('/demo/get/borrow',
  {
    resource_id:id
  }, 
  {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function signup(firstName, lastName,username, password) {
  return instance.post('/demo/add',
    {
      role:"STUDENT",
      username: username,
      password:password,
      lastname: lastName,
      firstname: firstName
    },
    {
    headers: { 'Content-type': 'application/json',
        "Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
    })
}

function createAll(body) {
  return instance.post('demo/add/resource', body, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}


const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})


function basicAuth(user) {
  return `Basic ${user.authdata}`
}