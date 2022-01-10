import React,{ SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { _userService }from '../../services/userSesion'
import './style.scss'

const tryLogin = async(password:string, userNameEmail:string) =>{
    return await _userService.tryLogIn({password,userNameEmail},()=>{})
}

const RegisterScreen = () => {

    const [userNameEmail, setUserNameEmail] = useState('')
    const [password, setpassword] = useState('')

    const submitForm = (event:SyntheticEvent)=>{
        event.preventDefault()
        let response = tryLogin(password,userNameEmail)
        console.log(response)
    }

    return(
        <div className="loginMainContainer">
            <form className="loginForm" onSubmit={submitForm}>
                <div className="formTitle">
                    Complete los datos para registrarse
                </div>
                <div className="inputContainer">
                    <label htmlFor="userEmail">Usuario o email</label>
                    <input type="text" id="userEmail" value={userNameEmail} onChange={(e)=>setUserNameEmail(e.target.value)} />
                </div>
                <div className="inputContainer">
                    <label htmlFor="passWord">Contraseña</label>
                    <input type="password" id="passWord" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                <div className="actionsContainer">
                    <button>
                        Registrarme
                    </button>
                    <Link to="/register">
                        Ingresar
                    </Link>
                </div>
            </form>
            <div className="emptyNavBar">

            </div>
        </div>
    )

}

export default RegisterScreen