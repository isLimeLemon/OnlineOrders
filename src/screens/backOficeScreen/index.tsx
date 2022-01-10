import React from "react";
import { rootState } from "../../store";
import { useSelector } from "react-redux";
import { ProductForm } from "../../components/EditProductFormComponent";


import './style.scss'
import { Link, Outlet } from "react-router-dom";

const BackOficeScreen = () => {

    const User = useSelector((state:rootState) => state.User.value)

    return(
        <div className="backOfficeContainer">
            <nav className="backOfficeNav">

                <div className="backOfficeNavLogo">
                    <strong>e-order</strong>
                    <p>admin</p>
                </div>

                <ul>
                    <li><Link to="/backoffice/admin-products">Productos</Link></li>
                    <li><Link to="/backoffice/admin-users">Usuarios</Link></li>
                    <li><Link to="/backoffice/admin-orders">Pedidos</Link></li>
                    <li><Link to="/backoffice/"></Link></li>
                    <li></li>
                </ul>
                
            </nav> 
            <div className="backOfficeOutletContainer">
                   <Outlet/>
            </div>
            <Link className="exitBtn" to="/home">
                Salir
            </Link>
        </div>
    )

}

export default BackOficeScreen