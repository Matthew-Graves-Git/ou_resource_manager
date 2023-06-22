import axios from 'axios'
import { config } from './Constants'

export const ResourcifyApi = {
  authenticate,
  createOrEditUser,
  basicAuth,
  IsAdmin,
  getResources,
  getQty,
  createOrEditResource,
  addToCart,
  getCart,
  addFunds,
  deleteAllCart,
  rent,
  updatePassword,
  getUser,
  getBorrowed,
  getPurchased,
  restockItem,
  purchase,
  getItemsByUsername,
  returnItem
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
function restockItem(body) {
  console.log(body)
  return instance.post('/demo/add/item',body, {
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

function deleteAllCart(req) {
  return instance.post('/demo/do/cart_remove',req, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function rent(req) {
  return instance.post('/demo/do/borrow',req, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function purchase(req) {
  return instance.post('/demo/do/purchase',req, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}


function getResources(category) {
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

function createOrEditUser(body) {
  return instance.post('/demo/add/user',body,
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

function createOrEditResource(body) {
  return instance.post('demo/add/resource', body, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function updatePassword(body){
  return instance.post('demo/do/update_password', body, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function returnItem(body){
  return instance.post('demo/do/return', body, {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getUser(){
  return instance.get('demo/get/user', {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getBorrowed(){
  return instance.get('demo/get/user/borrowed', {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getPurchased(){
  return instance.get('demo/get/user/purchased', {
    headers: {"Access-Control-Allow-Origin": '*'},
      proxy: {
          protocol: 'http',
          host: '127.0.0.1',
          port: 8080,
      },
  })
}

function getItemsByUsername(req){
  return instance.post('demo/find/user/borrowed',req, {
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