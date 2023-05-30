import Navbar from "../Navbar/Navbar";
import {Outlet } from "react-router-dom";

const DefaultContainer = () => {
    return ( 
    <>
        <Navbar/>
        <Outlet/>
    </> 
);
}
 
export default DefaultContainer;