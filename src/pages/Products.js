import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from './Card';
import Card2 from './Card2';

function Products() {

    const [products, setProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleFilter = filteredProducts => {
        setFilteredProducts(filteredProducts);
      };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axios.get(`/productos/limited`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
                // console.log(products[2].imagenes)
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
        
        {/* {products?.length
                ? (
                    <div className='card-container'>
                        {products.map((product, i) =>
                            // <Link to={`/productos/${product._id}`}>
                            <Card key={i} titulo={product.titulo} img={product.imagen} precio={product.precio} product={product}/>
                            // </Link>
                            )}
                    </div>
                ) : <p>No hay productos</p>
            } */}

        {products?.length
                ? (
                    <div className='card-container'>
                        {products.map((product, i) =>
                            // <Link to={`/productos/${product._id}`}>
                            <Card2 key={i} id={product._id} titulo={product.titulo} img={product.imagenes[0]} precio='10' product={product}/>
                            // </Link>
                            )}
                    </div>
                ) : <p>No hay productos</p>
            }
        
    </div>
  )
}

export default Products