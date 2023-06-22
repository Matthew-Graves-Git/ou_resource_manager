import {Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const LoginContainer = () => {
    return (
    <div className="noHeader">
        <Navbar isLoginPage="true" />
        <Outlet/>
        <Footer/> 
    </div>);
}
 
export default LoginContainer;