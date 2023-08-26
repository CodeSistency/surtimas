import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import { useState, useEffect, } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from './Card';
import Card2 from './Card2';
import Gallery from './Gallery';
import Nav from './Nav';
import Gallery2 from './Gallery2';
import Search from './Search';

function AllProducts() {

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
                const response = await axios.get('/productos', {
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

    

      const { cart, setCart, searchQuery } = useContext(CartContext);

  return (
    <div >
        <Nav/>
        <div style={{marginTop:'150px'}}>
          {searchQuery && <h4>'{searchQuery}'</h4>}
          {

          searchQuery ? <Search /> 
          :
          <Gallery2 />
          }

      </div>
        
    </div>
  )
}

export default AllProducts