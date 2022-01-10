import React, { useEffect, useState } from 'react'
import { useForm } from '../../customHooks/useForm'
import { useQuery } from '../../services/getUrlData'
import { _productsService } from '../../services/products'
import { productData } from '../product'
import { ProductDetail } from '../../services/products'

import './style.scss'
import { format } from 'path'

const productForm:productData = {
    image:"",
    description:"",
    id:0,
    price:10,
    title:""
}

interface productFormProps {
    edit:boolean,
    open:boolean,
    idProd:string | false
}

export const ProductForm = ({edit = false, open = false, idProd = false}:productFormProps) => {

    const [Product, setProduct] = useState<ProductDetail>({
        categoryId:0,
        id:0,
        image_Large:"",
        image_Medium:"",
        image_Small:"",
        price:0,
        title:"",
    })



    useEffect(() => {
        if(edit && idProd){
            _productsService.detail(idProd).then((res)=>{
                console.log(res.data)
                setProduct(res.data.dataValues)
                console.log("IN "+Product)
            }).catch(err =>{
                console.log(err)
            })
        }


    }, [edit, idProd])

    console.log(Product)

    return (
        <form className='FormContainer'>
            <div className='formContent'>
                <div className='inputContainer'>
                    <label>Imagen</label>
                    <img src={edit ? Product.image_Medium : productForm.image}/>
                    <button className='LoadImageBtn' onClick={()=>{window.document.getElementById('getFile')?.click()}}>Cargar imagen</button>
                    <input type='file' id="getFile" style={{display:"none"}}/>
                </div>
                <div className='inputContainer'>
                    <label htmlFor="name">Nombre</label>
                    <input value={edit ? Product.title : productForm.title} type="text" id="name" name="name" />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="price">Precio</label>
                    <input value='2560' type="text" id="price" name="price"/>
                </div>
            </div>
            <div className='submitBtn'>
                <button type='submit'>
                    {edit ? "Guardar cambios" : "Agregar nuevo"}
                </button>
            </div>
            
        </form> 
    )
}
