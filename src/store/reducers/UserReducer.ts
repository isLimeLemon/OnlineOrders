import { createSlice } from "@reduxjs/toolkit"

export interface notif {
    id:number,
    read:boolean
    title:string,
    message:string,
    image:string
}

export interface cartItem{
    image:string,
    name:string,
    price:string,
    url:string
}

export interface addresData{
    street:string,
    number:number,
    city:string,
    postalCode:string
}

export interface UserData {
    userName:string,
    email:string,
    role:string,
    logged:boolean,
    cart:Array<cartItem>,
    image:string,
    token:string,
    addres:addresData,
    lastSearch:Array<string>,
    notifications:Array<notif>,
    notificationsUnread:number
}

const initialState:UserData = {
    userName:'',
    logged:false,
    email:'',
    image:'',
    role:'',
    addres:{city:"Rafael castillo",number:535,postalCode:"1755",street:"Drago"},
    cart:[{image:"",name:"",price:"",url:""}],
    token:'',
    lastSearch:[],
    notifications:[
        {id:1,read:false,image:"",message:"Descuento del 15% en arduino 32u4",title:"nuevo descuento!"},
        {id:2,read:false,image:"",message:"Rebaja del 10% en sensores",title:"mas rebajas!"},
        {id:3,read:false,image:"",message:"invita a un amigo y obtene hasta 30% off",title:"juntos podemos!"},
        {id:4,read:false,image:"",message:"Les deseamos un muy feliz año nuevo a todos los que confian en nosotros",title:"Feliz año nuevo!"}
    ],
    notificationsUnread:1
}

/*
const userDTO = {
            userName,
            email,
            role,
            image,
            token:createToken(userExist)
        }
*/
export const UserSlice = createSlice({
    name:'user',
    initialState:{value:initialState},
    reducers:{ 
        logIn:(state, data)=>{
            
            state.value = { ...state.value,...data.payload, logged:true}
             
            let NotifUnread:number = 0

            state.value.notifications.forEach(Notification => {
                if(!Notification.read){
                    ++NotifUnread
                }
            })

            state.value = {...state.value, notificationsUnread:NotifUnread}

        },
        logOut:(state)=>{
            console.log("*-*//-*/*-/-*",state.value)
            state.value = {...initialState, logged:false}
            
        },
        viewNotifications:(state)=>{
            state.value = {...state.value, notificationsUnread:0}
            
        },
        deleteNotification:(state, data)=>{

            const id = data.payload
            let NewArr = [...state.value.notifications]

            const deleteElement = NewArr.findIndex(element => element.id === id )

            NewArr.splice(deleteElement,1)

            state.value = {...state.value, notifications:NewArr}

            let NotifUnread:number = state.value.notificationsUnread

            if(NotifUnread > 0){

                NotifUnread = 0;
                state.value.notifications.forEach(Notification => {
                    if(!Notification.read){
                        ++NotifUnread
                    }
                })

            }

            state.value = {...state.value, notificationsUnread:NotifUnread}
        }
    }
})

export const { logIn, logOut, viewNotifications, deleteNotification } = UserSlice.actions
export default UserSlice.reducer