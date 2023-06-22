import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Outlet } from "react-router-dom";

const DefaultContainer = () => {
    return ( 
        <>
    <>
        <Navbar isLoginPage="false" />
        <Outlet/>
    </> 
    <>
      <Footer/>
    </>
    </>
);
}
 
export default DefaultContainer;