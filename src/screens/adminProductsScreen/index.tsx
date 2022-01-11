import React, { useState, useEffect } from 'react'
import { ProductForm } from '../../components/EditProductFormComponent'
import ProductList from '../../components/productListComponent'
import { _productsService } from '../../services/products'
import { useQuery } from '../../services/getUrlData'


import './style.scss'

export const AdminProducts = () => {

    /******************************************/
    const query = useQuery()
    const search = query.get('s') ? query.get('s') : ''

    const [Products, setProducts] = useState([])
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
  
    useEffect(()=>{
        _productsService.search(search,page)
        .then((res)=>{
            setProducts(res.data.data)
            setLoading(false)
            setPages(res.data.totalPages)
        })
        .catch(()=>{
            setLoading(false)
        })
    },[page, search])

    /******************************************/

    const [Open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('19')
    const [openClass, setOpenClass] = useState("closed hidden")

    const openCloseForm = () =>{
        if(Open){
            setOpenClass("closed show") 
            setTimeout(() => {
                setOpenClass("hide")
            }, 200);
        }else{
            setOpenClass("show")
            setTimeout(() => {
                setOpenClass("show open")
            }, 10);
        }
    }

    const editProduct = (Id:string|number) => {
        setId(String(Id))
        setOpen(true)
        if(!Open)openCloseForm()
        setEdit(true)
        //console.log("EDITANDO")
    }

    return (
        <div className='adminProducstMainContainer'>
            <div className=''> 
                <button onClick={()=>{setOpen(!Open);openCloseForm()}}>Abrir / cerrar</button>
                <button onClick={()=>{setEdit(!edit)}}>Editar</button>
                <div className='ProductsListContainer'>
                    <ProductList 
                        Products={Products}
                        loading={loading}
                        page={page}
                        pages={pages}
                        setPage={setPage}
                        editProducts={true}
                        editAction={editProduct}
                    />
                </div>
                
            </div>
            <div className={'ProductFormContainer '+ openClass }>
                
                <ProductForm edit={edit} idProd={id}/>
            </div>
        </div>
    )
}
