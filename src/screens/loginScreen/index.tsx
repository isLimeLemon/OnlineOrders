import React, {useEffect} from "react";
import './style.scss'
import LoginForm from '../../components/LoginFormComponent'
import { rootState } from "../../store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";


const LoginScreen = () => {

    const User = useSelector((state:rootState) => state.User.value)

    useEffect(() => {
        
    }, [User])

    return(
        <div className="loginMainContainer">
            {User.logged && <Navigate to="/home"/>}
            <LoginForm/>
            <div className="emptyNavBar"></div>
        </div>
    )

}

export default LoginScreen