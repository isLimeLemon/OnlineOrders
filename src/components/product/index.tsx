import React from "react";
import { Link } from "react-router-dom";
import { rootState } from "../../store";
import { useSelector } from "react-redux";

import editLogo from '../../assets/images/edit.svg'
import heart from '../../assets/images/heart.svg'
import './style.scss'

export interface productData{
    title:string
    image:string,
    description:string,
    price:number,
    id:number
}

const Product = ({image,description,price,title, id}:productData) => {

    const pathname = "/detail?id="+id
    const User = useSelector((state:rootState) => state.User.value)

    return (
        <div className="productContainer" key={id}>
            {(User.logged && User.role==="admin") &&
                <Link to={"/backoffice/admin-products?edit="+id} className="editBtn">
                    <img alt="edit" src={editLogo}/>
                </Link>
            }            
            <div className="favBtn">
                <img src={heart}/>
            </div>
            <Link className="toDetails" to={pathname}>
                <div className="productImage">
                    <img src={image} alt={description}/>
                </div>
                <div className="productData">
                    <div className="productDescription">{title}</div>
                    <div className="productPrice">$ {price}</div>
                </div>
            </Link>
        </div>
    )
    
}

export default Product