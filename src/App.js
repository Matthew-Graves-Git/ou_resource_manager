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
import AddFunds from './Pages/Admin/AddFunds';
import Restock from './Pages/Restock';
import Profile from './Pages/Profile';
import Return from './Pages/Return';

function App() {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images', false, /\.(png|gif|jpe?g|svg)$/));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [items,setItems] = useState([]);
  const [laptops,setlaptops] = useState([]);
  const [pcs,setpcs] = useState([]);
  const [accesories,setaccesories] = useState([]);
  const [tablet,settablet] = useState([]);

const filterResources = (all) =>{
  settablet(all.filter(item => item.role === "TABLET"))
  setlaptops(all.filter(item => item.role === "LAPTOP"))
  setpcs(all.filter(item => item.role === "DESKTOP"))
  setaccesories(all.filter(item => ((item.role !== "DESKTOP") &&
  (item.role !== "TABLET") &&
  (item.role !== "LAPTOP")
  )))
}

// function postAll(array, cat){
//   array.forEach(async element => {
//       await ResourcifyApi.createAll(
//       {
//           ...element,
//           resource_category:cat,
//           sale_price:"199.00",
//           description:"",
//           request_type: "create"
//       }
//       )
//   });
// }
//
// useEffect( () => {
//   postAll(laptop,"LAPTOP")
//   postAll(pc,"DESKTOP")
//   postAll(tablets,"TABLET")
//   postAll(accesorie,"CALCULATOR")
// }, [] );

const handleRent = async (role,model,category) =>{
  const [id,cat] = role;
  const res = await ResourcifyApi.addToCart(id);
  
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
              <Route exact path='/Funds' element={<SecureRoute><AddFunds/></SecureRoute>} />
              <Route exact path='/Restock' element={<SecureRoute><Restock/></SecureRoute>} />
              <Route exact path='/Profile' element={<SecureRoute><Profile/></SecureRoute>} />
              <Route exact path='/Return' element={<SecureRoute><Return/></SecureRoute>} />
              <Route exact path='/CreateResource' element={<SecureRoute><CreateResource/></SecureRoute>} />
            </Route>
          </Routes>
      </Router>
    </AuthProvider>
  );


  }


export default App;
