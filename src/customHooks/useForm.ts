// eslint-disable-next-line
import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react";

export const useForm = (initialForm:any, validateForm:Function)=>{
    
    const [form,setForm] = useState(initialForm)
    const [errors, setErrors] = useState(():typeof initialForm=>({}))
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line
    const [response, setResponse] = useState(null)

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        setForm(
            {
                ...form,
                [name]:value
            }
        )

    }

    const handleKeyUp = (e:KeyboardEvent<HTMLInputElement>) => {
        setErrors(validateForm(form))
    }

    const handleBlur = (e:ChangeEvent<HTMLInputElement>)=>{
        handleChange(e)
        setErrors(validateForm(form))
    }
  
    const handleSubmit = (e:any)=>{}

    return {
        form,
        errors,
        loading,
        response,
        handleBlur,
        handleKeyUp,
        handleChange,
        handleSubmit,
    }
}