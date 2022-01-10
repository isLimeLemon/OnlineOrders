import React from "react";
import './style.scss'
/*
const Loading = ({productDetail}:loadingData)=>{
    if(productDetail.id === 0){
        return(<div className="detailContainer"><ClipLoader size={150} color="#F19143" /></div>)
    }else{
        return (
            <div className="detailContainer">
                <div className="imageContainer">
                    <img alt={""} src={productDetail.image} />
                </div> 
                <div className="dataContainer">
                    <h2 className="productName">{productDetail.title}</h2>
                    <p className="productDescription">{productDetail.description}</p>
                    <label className="productPrice">{productDetail.price}</label>
                    <div className="addToCart">
                        Agregar al carrito
                    </div>
                </div> 
            </div>
        )
    }
}*/

const ProductDetail =  () => {

   // const [productDetail, setDetail] = useState(():productData=>({id:0,title:"",description:"",image:"",price:0}))

   return (
       <div className="detailMainContainer">
           
       </div>
   )
}

export default ProductDetail