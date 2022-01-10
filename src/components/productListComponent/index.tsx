import React from "react";
import Product from "../product";
import './style.scss'
import { queryProductData } from '../../models'
import PaginationBar from "../paginationComponent";
import { ClipLoader } from "react-spinners";

interface productListProps{
    setPage:Function,
    page:number,
    pages:number,
    loading:boolean,
    Products:Array<queryProductData>
}

const ProductList = ({Products,loading,page,pages,setPage}:productListProps) => {
 
    return(
        <div className="productListContainer">
            <PaginationBar updatePage={setPage} actualPage={page} totalPages={pages}/>
            <div className="productList"> 
                {
                    loading === false ? 
                        Products.length > 0 ? 
                            Products.map((product:queryProductData) => (
                                <Product key={product.title} id={product.id} title={product.title} image={product.image_Medium} description={product.description} price={product.price} />
                            ))
                        : <div><h3>Sin resultados</h3></div>
                    : <div className="loadSpinner"><ClipLoader size={100} color="#F19143"/></div>
                }
            </div>
        </div>
    )

}


export default ProductList
