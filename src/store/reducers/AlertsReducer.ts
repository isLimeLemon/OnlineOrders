import { createSlice } from "@reduxjs/toolkit"
import { JsxElement } from "typescript"

export interface AlertDataInterface {
    type:'alert'|'danger'|'question'|'success'|'warning'|'',
    message:string,
    btns?:Array<JsxElement>
    cb?:Function
}

const initialState:AlertDataInterface = {
    message:'',
    type:'',
}

export const AlertSlice = createSlice({
    name:'user',
    initialState:{},
    reducers:{ 
        
    }
})

export const { } = AlertSlice.actions
export default AlertSlice.reducer