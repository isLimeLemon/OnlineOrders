import { API } from "../config/axios"

export interface ProductDetail {
    id: number;
    title: string;
    price: number;
    image_Large: string;
    image_Medium: string;
    image_Small: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    categoryId: number;
}

interface resData {
    dataValues:ProductDetail
}

export const _productsService = {
    
    search:async (data:string|null, page:number) => {

        return await API.get(`/products?s=${data}&p=${page}`)
    
    },
    detail:async (id:number | string) => {
        
        return await API.get<resData>('products/details/'+id)
    
    }

}

