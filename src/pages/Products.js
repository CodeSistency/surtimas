import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import axios from '../api/axios';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from './Card';

function Products() {

    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axios.get('/products', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
                console.log(products[2].imagenes)
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

  return (
    <div >
        
        {products?.length
                ? (
                    <div className='card-container'>
                        {products.map((product, i) =>
                            // <Link to={`/productos/${product._id}`}>
                            <Card key={i} titulo={product.titulo} img={product.imagen} precio={product.precio} product={product}/>
                            // </Link>
                            )}
                    </div>
                ) : <p>No hay productos</p>
            }
        
    </div>
  )
}

export default Products