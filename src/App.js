import React, { useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthProvider } from './Authentification/Auth';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Laptop from "./Pages/Laptop";
import Cart from './Pages/Cart';
import SecureRoute from './Authentification/SecureRoute';
import DefaultContainer from './Components/DefaultContainer';
import LoginContainer from './Components/LoginContainer';

function App() {
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images', false, /\.(png|gif|jpe?g|svg)$/));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [items,setItems] = useState([ {
    name: "iBUYPOWER Slate MR Series 2",
    model: "Model:  a8119b28",
    price:"20.00",
    stock: "3 Available",
    image: images['pc-tower.png']
},
{
    name: "ThinkPad X1 Carbon Gen 10 Intel (14) - Black",
    model: "Model:  a7020a58",
    price:"50.00",
    stock: "1 Available",
    image: images['laptop.png']
},
{
  name: "iBUYPOWER Slate MR Series",
  model: "Model:  a8119b58",
  price:"23.00",
  stock: "3 Available",
  image: images['pc-tower.png']
},
{
  name: "ThinkPad X1 Carbon Gen 10 Intel (11) - Black",
  model: "Model:  a7020a38",
  price:"30.00",
  stock: "1 Available",
  image: images['laptop.png']
}]);

const handleRent = (model) =>{
  const temp = items;
  const t2 = cart.slice();
  const t3 = temp.filter(item => item.model === model);
  const t4 = temp.filter(item => item.model !== model);
  setTotal(total + parseInt(t3[0].price));
  t2.push(t3[0]);
  setCart(t2);
  setItems(t4);
}

const prop = {handleRent,items}
const cartProps = {cart,total}

  
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route element={<LoginContainer/>}>
              <Route exact path='/' element={<Login/>} />
            </Route>
            <Route element={<DefaultContainer/>}>
              <Route exact path='/Home' element={<SecureRoute><Home assets={prop}/></SecureRoute>} />
              <Route exact path='/Laptops' element={<SecureRoute><Laptop assets={prop}/></SecureRoute>} />
              <Route exact path='/Cameras' element={<SecureRoute><Laptop assets={prop}/></SecureRoute>} />
              <Route exact path='/Cart' element={<SecureRoute><Cart assets={cartProps}/></SecureRoute>} />
            </Route>
          </Routes>
      </Router>
    </AuthProvider>
  );


  }


export default App;
