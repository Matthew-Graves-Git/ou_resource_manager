import React, { useState, useEffect } from 'react';
import {all, tablets, accesorie, pc, laptop} from './temp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthProvider } from './Authentification/Auth';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Laptop from "./Pages/Laptop";
import Product from "./Pages/Product";
import Cart from './Pages/Cart';
import {SecureRoute} from './Authentification/SecureRoute';
import DefaultContainer from './Components/DefaultContainer';
import LoginContainer from './Components/LoginContainer';
import PC from './Pages/PC';
import Accesories from './Pages/Accesories';
import Tablet from './Pages/Tablet';
import SignUp from './Pages/SignUp';
import CreateResource from './Pages/Admin/CreateResource';
import { ResourcifyApi } from './Authentification/ResourcifyApi';

function App() {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images', false, /\.(png|gif|jpe?g|svg)$/));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [items,setItems] = useState(all);
  const [laptops,setlaptops] = useState(laptop);
  const [pcs,setpcs] = useState(pc);
  const [accesories,setaccesories] = useState(accesorie);
  const [tablet,settablet] = useState(tablets);

const filterResources = (all) =>{
  settablet(all.filter(item => item.role === "TABLET"))
  setlaptops(all.filter(item => item.role === "LAPTOP"))
  setpcs(all.filter(item => item.role === "DESKTOP"))
  setaccesories(all.filter(item => ((item.role !== "DESKTOP") &&
  (item.role !== "TABLET") &&
  (item.role !== "LAPTOP")
  )))
}

function postAll(array, cat){
  array.forEach(async element => {
      await ResourcifyApi.createAll(
      {
          ...element,
          resource_category:cat,
          sale_price:"199.00",
          description:""
      }
      )
  });
}

useEffect( () => {
  const all = [];
  async function getResourceQty(id){
    const stock = await ResourcifyApi.getQty(id);
    return stock.data;
  }
  async function getResources(category){
    const resources = await ResourcifyApi.getAllItems({resource_category:"LAPTOP"});
    if(resources){
      resources.data.forEach( async (item) => {
        const stock = await getResourceQty(item.resourceId)
        all.push({
          name: item.name,
          model: item.modelNumber,
          price: item.salePrice,
          stock: stock,
          image: images[item.image],
          role: item.resourceCategory
        })
      });
      filterResources(all)
    }
    if(category === 'all'){
      setItems(all);
    }else if(category === 'pc'){
      setpcs(all)
    }else if(category === 'acc'){
      setaccesories(all)
    }else if(category === 'tab'){
      settablet(all)
    }else if(category === 'lap'){
      setlaptops(all)
    }
  }
  getResources('all');
  getResources('pc');
  getResources('acc');
  getResources('tab');
  getResources('lap');
  
}, [] );

const handleRent = (model,category) =>{
    let temp= []

  if(category === 'all'){
    temp = items;
  }else if(category === 'pc'){
    temp = pcs;
  }else if(category === 'acc'){
    temp = accesories;
  }else if(category === 'tab'){
    temp = tablet;
  }else if(category === 'lap'){
    temp = laptops;
  }
  console.log("got to", category);
  const t2 = cart.slice();
  const t3 = temp.filter(item => item.model === model);
  const t4 = temp.filter(item => item.model !== model);
  addToTotal(parseInt(t3[0].price));
  t2.push(t3[0]);
  setCart(t2);
  if(category === 'all'){
    setItems(t4);
  }else if(category === 'pc'){
    setpcs(t4)
  }else if(category === 'acc'){
    setaccesories(t4)
  }else if(category === 'tab'){
    settablet(t4)
  }else if(category === 'lap'){
    setlaptops(t4)
  }
  
}

const saveToCart = (updatedCart) =>{
  const currentCart = updatedCart.slice();
  console.log(currentCart)
  const savedCart = localStorage.getItem("savedCart");
  if(savedCart){
    localStorage.setItem("savedCart", JSON.stringify(
      JSON.parse(savedCart)
      .concat(currentCart))
    )
  }else{
    localStorage.setItem("savedCart", JSON.stringify(currentCart))
  }
 
}

const clearSessionCart = () => {
  setCart([])
  setTotal(0);
}

const addToTotal = (amount) =>{
  setTotal(total + amount);
}

const prop = {handleRent,items:items,cat:"all"}
const propL = {handleRent,items:laptops,cat:"lap"}
const propT = {handleRent,items:tablet,cat:"tab"}
const propA = {handleRent,items:accesories,cat:"acc"}
const propP = {handleRent,items:pcs,cat:"pc"}
const cartProps = {cart,total,addToTotal,clearSessionCart}

window.onbeforeunload = function() {
  saveToCart(cart)
};

  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route element={<LoginContainer/>}>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/SignUp' element={<SignUp/>} />
            </Route>
            <Route element={<DefaultContainer/>}>
              <Route exact path='/Home' element={<SecureRoute><Home assets={prop}/></SecureRoute>} />
              <Route exact path='/Products' element={<SecureRoute><Product assets={prop}/></SecureRoute>} />
              <Route exact path='/PCs' element={<SecureRoute><PC assets={propP}/></SecureRoute>} />
              <Route exact path='/Accesories' element={<SecureRoute><Accesories assets={propA}/></SecureRoute>} />
              <Route exact path='/Tablets' element={<SecureRoute><Tablet assets={propT}/></SecureRoute>} />
              <Route exact path='/Laptops' element={<SecureRoute><Laptop assets={propL}/></SecureRoute>} />
              <Route exact path='/Cart' element={<SecureRoute><Cart assets={cartProps}/></SecureRoute>} />
              <Route exact path='/CreateResource' element={<SecureRoute><CreateResource/></SecureRoute>} />
            </Route>
          </Routes>
      </Router>
    </AuthProvider>
  );


  }


export default App;
