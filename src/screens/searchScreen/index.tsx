import React, { useEffect, useState } from "react";
import ProductList from "../../components/productListComponent";
import { useQuery } from "../../services/getUrlData";
import { _productsService } from '../../services/products'
import './style.scss'

const SearchScreen = () => {

    const query = useQuery()
    const search = query.get('s')

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
    },[page])

return(
    <div>
        <ProductList setPage={setPage} Products={Products} pages={pages} page={page} loading={loading}/>
    </div>
)

}

export default SearchScreen