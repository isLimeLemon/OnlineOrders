import React, { useState } from 'react'
import { ProductForm } from '../../components/EditProductFormComponent'
import ProductList from '../../components/productListComponent'

import './style.scss'

export const AdminProducts = () => {

    const [Open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('19')

    return (
        <div>
            <div className='ProductsListContainer'>
                <button onClick={()=>{setOpen(!Open)}}>Abrir / cerrar</button>
                <br/>
                <button onClick={()=>{setEdit(!edit)}}>Editar</button>
                <br/>
            </div>
            <div className={'ProductFormContainer '+(Open ? 'open' : 'closed')}>
                <ProductForm edit={edit} idProd={id} open={Open}/>
            </div>
        </div>
    )
}
