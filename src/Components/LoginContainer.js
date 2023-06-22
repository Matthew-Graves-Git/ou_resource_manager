import {Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const LoginContainer = () => {
    return (<>
        <Navbar isLoginPage="true" />
        <Outlet/>
        <Footer/> 
    </>);
}
 
export default LoginContainer;