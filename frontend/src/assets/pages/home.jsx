import React from 'react';
import {useEffect} from 'react';
import { useProductStore } from '../store/product.js';
import { ProductCard } from '../components/productCard.jsx';


export const Home = () => {

   
    const {fetchProducts, products} = useProductStore();

    

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log(products);


    return (
        <div>
            
            <div className=" flex flex-wrap justify-center gap-4 bg-green-950">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                    
                      
                   
                ))}
               
                
            </div>
        </div>
    )

}