import React, {useEffect, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import { rootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { UserData, logIn, logOut, notif, viewNotifications, deleteNotification } from "../../store/reducers/UserReducer";
import { _userService } from "../../services/userSesion";

import './style.scss'
import search from './assets/lupa.svg'
import notificationIcon from './assets/notification.svg'
import userIcon from './assets/user.png'
import cart from './assets/white-shoppingcart.svg'
 
const NavBar = () => {

const dispatch = useDispatch()

const [userMenu, setUserMenu] = useState(false)
const [notificationsOpen, setNotificationOpen] = useState(false)

const User = useSelector((state:rootState) => state.User.value)

const closeSession = ()=>{
    _userService.logOut()
    dispatch(logOut())
    setUserMenu(false)
}

useEffect(() => {
    console.log(User)
    if(User.logged === false){
        const token = _userService.getAuth()
        if(token){
            _userService.tryLoadUserData(token).then((res)=>{
                //console.log(res)
                if(res){
                    dispatch(logIn(res))
                }
            })
        }
    }
}, [User.logged])

    return (
    <div className="mainContainer">
        <div className="navContainer">
            <nav className="navBar">
                <div className="navSection">
                    <div className="logo">
                        <h3>e-pedidos</h3>
                    </div>
                    {User.logged && 

                        <div className="userAddress">
                            <p>Entrgar a</p>
                            <p>{User.addres.street} {User.addres.number}, {User.addres.city}</p>
                        </div>
                                                
                    }
                </div>
                <div className="navSection">
                    <form className="searchForm" action="/products" method="get">
                        <input type="text" name="s" placeholder="Nombre o codigo del producto..." />
                        <img src={search} alt="" />
                    </form>
                    <div className="linksContainer">
                            <Link className="Link" to="/">Inicio</Link>
                            <Link className="Link" to="/products?s=">Productos</Link>
                            <Link className="Link" to="/">Categorias</Link>
                            <Link className="Link" to="/">Ofertas</Link>
                            <Link className="Link" to="">Contacto</Link>
                    </div>
                </div>
                <div className="navSection">
                    <div className="addSection">
                        Descuentos de hasta 15% todos los sabados
                    </div>
                    <div className="userSection">
                        <div>
                            {
                                (User.logged
                                    ?<div>Favoritos</div>
                                    :<Link to='/login'>Iniciar sesion</Link>
                                )
                            }
                        </div>
                        <div>
                            {
                                (User.logged
                                    ?<div className="cartIcon">
                                        
                                        {   //renderizacion cantidad elementos carrito
                                            User.cart?.length > 0 && 
                                                <div className='itemsCartCount'>
                                                    {User.cart?.length}
                                                </div>
                                        }

                                        <img alt="cart" src={cart}/>
                                    </div>
                                    :<Link to='/register'>Crear Cuenta</Link>
                                )
                            }
                        </div>
                        <div className={"Icon notificationIcon " + (notificationsOpen?"collapseActive":"")} onClick={()=>{setNotificationOpen(!notificationsOpen); setUserMenu(false)}}>
                            {User.notificationsUnread > 0 && 
                                <div className='notificationCount'>
                                    {User.notificationsUnread}
                                </div>
                            }
                            <img alt="notificationIcon" src={notificationIcon}/>
                        </div>
                        <div className={"Icon userIcon " + (userMenu ? "collapseActive": '')} onClick={()=>{setUserMenu(!userMenu); setNotificationOpen(false) } } >
                            <img alt="userIcon" src={userIcon} />
                        </div>
                    </div>
                    {User.logged ?
                    //si el usuario está logeado cargamos el nav del usuario
                        <div className={userMenu ? "collapseUserMenu" : "hide"} onMouseLeave={()=>{setUserMenu(false)}}>
                            <ul>
                                <li>
                                    <Link to="#">{User.userName}</Link>
                                </li>
                                
                                { User.role === 'admin' &&
                                    <li>
                                        <Link to="/backoffice/admin-products">Administar</Link>
                                    </li>
                                }
                                <li>
                                    <Link to="#">Seguridad</Link>
                                </li>
                                <li>
                                    <Link to="">Privacidad</Link>
                                </li>
                                <li>
                                    <div onClick={closeSession}>
                                        Cerrar sesion
                                    </div>
                                </li>
                            </ul>
                        </div>
                            
                        ://si no está logeado inicia sesion

                        <div className={userMenu ? "collapseUserMenu" : "hide"} onMouseLeave={()=>{setUserMenu(false)}}>
                            <Link to='/login'>Iniciar sesion</Link>                        
                        </div>
                    }
                    {//*****Collapse de notificaciones******
                    User.notifications?.length > 0 ?
                    
                        <div className={notificationsOpen ? "collapseNotifications" : "hide"}
                            onMouseLeave={
                                ()=>{
                                    setNotificationOpen(false)
                                    dispatch(viewNotifications())
                                }
                        }>
                            
                            {User.notifications.map((notification:notif)=>(

                                <div className="notificationItem" key={notification.id}>
                                    <div className="deleteBtn" onClick={()=>{dispatch(deleteNotification(notification.id))}}>
                                        X
                                    </div>
                                    <div>
                                        <strong>{notification.title.toUpperCase()}</strong>
                                        <p>
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>
                                
                            ))}
                            
                        </div>
                            
                        ://si no

                        <div className={notificationsOpen ? "collapseNotifications" : "hide"} onMouseLeave={()=>{setNotificationOpen(false)}}>
                           Sin notificaciones                       
                        </div>
                    }

                </div>
            </nav>
        </div>
        <div className="outletContainer">
         <Outlet/>
        </div>
    </div>
    )
}

export default NavBar