import React from "react"
import { LoginErrorsFormInterface, LoginFormInterface } from '../../services/userSesion'
import { Link } from "react-router-dom";
import { _userService }from '../../services/userSesion'
import './style.scss'
import { useForm } from "../../customHooks/useForm";
import { expressions } from '../../constants'
import { useDispatch } from "react-redux";
import { logIn } from "../../store/reducers/UserReducer";

const tryLogin = async({password,userNameEmail}:LoginFormInterface) =>{
    const requestReslut = await _userService.tryLogIn({password,userNameEmail},()=>{})
    return requestReslut
}

const initialForm : LoginFormInterface = {
 userNameEmail:'',
 password:''
}

const validateLogin = (form:LoginFormInterface) => {
    let errors:LoginErrorsFormInterface = {password:null,userNameEmail:null,valid:false}

    if(form.userNameEmail.length < 2){
        errors.valid = false
        errors.userNameEmail = 'Es necesario ingresar el email o nombre de usuario'
    }else {errors.valid = true} 
    if(form.password.length < 4){
        errors.valid = false
        errors.password = 'La contraseña debe tener al menos 8 caracteres'
    }else {errors.valid = true}
    return errors
} 
 
const LoginForm = () => {
    
    const dispatch = useDispatch()
    // eslint-disable-next-line
    const {form,errors,handleKeyUp,handleBlur,handleChange,handleSubmit,loading,response} = useForm(initialForm, validateLogin)

    return(
            <form className="loginForm" onSubmit={(e)=>{
                e.preventDefault()
                tryLogin(form).then((res)=>{
                    if(res){
                        console.log(res)
                        dispatch(logIn(res))
                    }else{
                        alert("Usurio y/o contraseña incorrecto/s")
                    }
                })
                }}>
                <div className="formTitle">
                    Ingrese su usuario o correo electronico para iniciar sesion
                </div>
                <div className="inputContainer">
                    <label htmlFor="userEmail">Usuario o email</label>
                    <input
                        name="userNameEmail" 
                        type="text" 
                        id="userEmail" 
                        onKeyUp={handleKeyUp}
                        onChange={handleChange} 
                        value={form.userNameEmail}
                        onBlur={handleBlur}
                    />
                    {errors.userNameEmail ? 
                        (<p> 
                            {errors.userNameEmail}
                        </p>)
                        :
                        (<p></p>)}
                </div>
                <div className="inputContainer">
                    <label htmlFor="passWord">Contraseña</label>
                    <input 
                        name="password"
                        type="password"
                        id="passWord" 
                        onKeyUp={handleKeyUp}
                        onChange={handleChange} 
                        value={form.password}
                        onBlur={handleBlur}
                    />
                    {errors.password &&
                        (<p> 
                            {errors.password}
                        </p>)
                    }
                </div>
                <div className="actionsContainer">
                    <button type="submit" disabled={errors.valid ? false : true}>
                        Ingresar
                    </button>
                    <Link to="/register">
                        Crear cuenta
                    </Link>
                </div>
            </form>
    )

}

export default LoginForm