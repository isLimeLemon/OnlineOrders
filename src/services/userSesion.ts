import { API } from '../config/axios'

export interface LoginFormInterface {
    userNameEmail:string,
    password:string
}

export interface LoginErrorsFormInterface {
    userNameEmail:string|null,
    password:string|null,
    valid:boolean
}

interface dateFormat{
    day:number,
    month:number,
    year:number
}

export interface registerForm {
    userName:string,
    email:string,
    emailRepeat:string,
    password:string,
    passwordRepeat:string,
    birthDate:dateFormat
}

/*
class _UserService{

    private token:string

    constructor() {
        this.token = String( localStorage.getItem('e-order-auth') ? localStorage.getItem('e-order-auth') : '' ) 
    }

    login(sessionData:LoginFormInterface, cb:Function ){
        API.post('/auth/login', sessionData).then(res=>{
            return res.data
        },
        
        )
    }

    async tryLoadUserData (token:string, cb:Function){
        const response = await API.get('/auth/validate',{
            headers:{
                'Authorization':token
            }
        })
        console.log('*** ',response)
         
        return response.data
    }

}
*/

export const _userService = {

    register:()=>{

    },
    tryLogIn:async(sessionData:LoginFormInterface, cb:Function )=>{
        
        const response =  await API.post('/auth/login', sessionData)

        if(response){
            localStorage.setItem('e-order-auth', JSON.stringify(response.data.token) )
            return response.data
        }
        return false
        


    },
    tryLoadUserData:async(token:string, cb?:Function)=>{
        const response = await API.get('/auth/validate',{
            headers:{
                'Authorization':token
            }
        })
        console.log('*** ',response)
        
        if(response){
            return response.data
        }
        return false
    },
    getAuth:()=>{
        let auth = localStorage.getItem('e-order-auth');
        return auth ? auth : false
    },
    logOut:()=>{
        localStorage.removeItem('e-order-auth')
    }


}