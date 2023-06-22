import React, { useState, useEffect } from 'react';
import {tablets, accesorie, pc, laptop} from './temp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthProvider } from './Authentification/Auth';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Laptop from "./Pages/Laptop";
import Cart from './Pages/Cart';
import {SecureRoute} from './Authentification/SecureRoute';
import DefaultContainer from './Components/DefaultContainer';
import LoginContainer from './Components/LoginContainer';
import PC from './Pages/PC';
import Accesories from './Pages/Accesories';
import Tablet from './Pages/Tablet';
import CreateResource from './Pages/Admin/CreateResource';
import { ResourcifyApi } from './Authentification/ResourcifyApi';
import AddFunds from './Pages/Admin/AddFunds';
import Restock from './Pages/Restock';
import Profile from './Pages/Profile';
import Return from './Pages/Return';
import Logout from './Pages/Logout';
import CreateUser from './Pages/Admin/CreateUser';

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

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  async function postAll(array, cat) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      await ResourcifyApi.createOrEditResource({
        ...element,
        resource_category: cat,
        description: "",
        request_type: "create",
        stock: "1 Available"
      });
      const resources = await ResourcifyApi.getResources({resource_category:cat});
      resources.data.forEach(async (item)=>{
        console.log({ resource_id: item.resource_id, item_type: "BORROW", serial_number: uuidv4() });
        await ResourcifyApi.restockItem({ resource_id: item.resourceId, item_type: "BORROW", serial_number: uuidv4() });
        await ResourcifyApi.restockItem({ resource_id: item.resourceId, item_type: "SALE", serial_number: uuidv4() });
      })
    }
  }

  const hasStuffInDatabase = async () => {
    // Check if there are resources in the "DESKTOP" category
    const resources = await ResourcifyApi.getResources({resource_category:"DESKTOP"});
    if (resources.data.length === 0) {
      await postAll(laptop,"LAPTOP");
      await postAll(pc,"DESKTOP");
      await postAll(tablets,"TABLET");
      await postAll(accesorie,"CALCULATOR");
      await ResourcifyApi.createOrEditUser({request_type:"create",role:"ADMIN",username:"admin",password:"admin",lastname:"Administrator",firstname:"Test"});
    }
  };

  const onlyFillDatabaseOnce = async () => {
    if (window.sessionStorage.getItem("checkedDB") !== "true") {
      window.sessionStorage.setItem("checkedDB", "true");
      await hasStuffInDatabase();
    }
  }
  onlyFillDatabaseOnce();

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
            </Route>
            <Route element={<DefaultContainer/>}>
              <Route exact path='/Home' element={<SecureRoute><Home assets={prop}/></SecureRoute>} />
              <Route exact path='/PCs' element={<SecureRoute><PC assets={propP}/></SecureRoute>} />
              <Route exact path='/Accesories' element={<SecureRoute><Accesories assets={propA}/></SecureRoute>} />
              <Route exact path='/Tablets' element={<SecureRoute><Tablet assets={propT}/></SecureRoute>} />
              <Route exact path='/Laptops' element={<SecureRoute><Laptop assets={propL}/></SecureRoute>} />
              <Route exact path='/Cart' element={<SecureRoute><Cart assets={cartProps}/></SecureRoute>} />
              <Route exact path='/Funds' element={<SecureRoute><AddFunds/></SecureRoute>} />
              <Route exact path='/Restock' element={<SecureRoute><Restock/></SecureRoute>} />
              <Route exact path='/Profile' element={<SecureRoute><Profile/></SecureRoute>} />
              <Route exact path='/Return' element={<SecureRoute><Return/></SecureRoute>} />
              <Route exact path='/Logout' element={<SecureRoute><Logout/></SecureRoute>} />
              <Route exact path='/CreateResource' element={<SecureRoute><CreateResource/></SecureRoute>} />
              <Route exact path='/CreateUser' element={<SecureRoute><CreateUser/></SecureRoute>} />
            </Route>
          </Routes>
      </Router>
    </AuthProvider>
  );


  }


export default App;
