import Navbar from "./Navbar/Navbar";
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Laptop from "./Pages/Laptop";

function App() {

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/Laptops' element={<Laptop/>} />
        </Routes>
      </div>
    </div>
    </Router>
  );


  }


export default App;
