import React from "react";
import './style.scss'

interface PaginationData {
    totalPages:number,
    actualPage:number,
    updatePage:Function
}

const loadPages = (totalPages:number) => {
    let arr = []
    for(let i = 1; i <= totalPages; i++){
        arr.push(i)
    }
    return arr
}

const PaginationBar = ({updatePage,actualPage,totalPages}:PaginationData) => {

    const pages = loadPages(totalPages)

    return (
        <div className="paginationContainer">
            {
                pages.map((page)=>(
                    <div key={page} className={"pageLink " + (page === actualPage ? "pageActive" : "")} onClick={()=>{updatePage(page)}}>
                        {page}
                    </div>    
                ))
            }
        </div>
    ) 

}

export default PaginationBar