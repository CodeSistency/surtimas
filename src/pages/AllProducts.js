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
import Gallery from './Gallery';
import Nav from './Nav';
import Gallery2 from './Gallery2';

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

    const objetos = [
        {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
          {
            titulo: 'card',
            precio: 10,
            tipo: 'camisa',
            sexo: 'mujer',
            tallas: {
              'U': [{ color: "#fff", quantity: 0 }],
              'XS': [{ color: "#fff", quantity: 0 }],
              'S': [{ color: "#fff", quantity: 0 }],
              'M': [{ color: "#fff", quantity: 0 }],
              'L': [{ color: "#fff", quantity: 0 }],
              'XL': [{ color: "#fff", quantity: 0 }],
              '0XL': [{ color: "#fff", quantity: 0 }],
              '2XL': [{ color: "#fff", quantity: 0 }],
              '3XL': [{ color: "#fff", quantity: 0 }],
              '4XL': [{ color: "#fff", quantity: 0 }],
              '5XL': [{ color: "#fff", quantity: 0 }],
              'FIT': [{ color: "#fff", quantity: 0 }],
            },
            tallas_zapatos:{
              '25': [{ color: "#fff", quantity: 0 }],
              '26': [{ color: "#fff", quantity: 0 }],
              '27': [{ color: "#fff", quantity: 0 }],
              '28': [{ color: "#fff", quantity: 0 }],
              '29': [{ color: "#fff", quantity: 0 }],
              '30': [{ color: "#fff", quantity: 0 }],
              '31': [{ color: "#fff", quantity: 0 }],
              '32': [{ color: "#fff", quantity: 0 }],
              '33': [{ color: "#fff", quantity: 0 }],
              '34': [{ color: "#fff", quantity: 0 }],
              '35': [{ color: "#fff", quantity: 0 }],
              '36': [{ color: "#fff", quantity: 0 }],
              '37': [{ color: "#fff", quantity: 0 }],
              '38': [{ color: "#fff", quantity: 0 }],
              '39': [{ color: "#fff", quantity: 0 }],
              '40': [{ color: "#fff", quantity: 0 }],
              '42': [{ color: "#fff", quantity: 0 }],
              '43': [{ color: "#fff", quantity: 0 }],
              '44': [{ color: "#fff", quantity: 0 }],
            },
            
            imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
          },
        {
          titulo: 'card',
          precio: 10,
          tipo: 'camisa',
          sexo: 'mujer',
          tallas: {
            'U': [{ color: "#fff", quantity: 0 }],
            'XS': [{ color: "#fff", quantity: 0 }],
            'S': [{ color: "#fff", quantity: 0 }],
            'M': [{ color: "#fff", quantity: 0 }],
            'L': [{ color: "#fff", quantity: 0 }],
            'XL': [{ color: "#fff", quantity: 0 }],
            '0XL': [{ color: "#fff", quantity: 0 }],
            '2XL': [{ color: "#fff", quantity: 0 }],
            '3XL': [{ color: "#fff", quantity: 0 }],
            '4XL': [{ color: "#fff", quantity: 0 }],
            '5XL': [{ color: "#fff", quantity: 0 }],
            'FIT': [{ color: "#fff", quantity: 0 }],
          },
          tallas_zapatos:{
            '25': [{ color: "#fff", quantity: 0 }],
            '26': [{ color: "#fff", quantity: 0 }],
            '27': [{ color: "#fff", quantity: 0 }],
            '28': [{ color: "#fff", quantity: 0 }],
            '29': [{ color: "#fff", quantity: 0 }],
            '30': [{ color: "#fff", quantity: 0 }],
            '31': [{ color: "#fff", quantity: 0 }],
            '32': [{ color: "#fff", quantity: 0 }],
            '33': [{ color: "#fff", quantity: 0 }],
            '34': [{ color: "#fff", quantity: 0 }],
            '35': [{ color: "#fff", quantity: 0 }],
            '36': [{ color: "#fff", quantity: 0 }],
            '37': [{ color: "#fff", quantity: 0 }],
            '38': [{ color: "#fff", quantity: 0 }],
            '39': [{ color: "#fff", quantity: 0 }],
            '40': [{ color: "#fff", quantity: 0 }],
            '42': [{ color: "#fff", quantity: 0 }],
            '43': [{ color: "#fff", quantity: 0 }],
            '44': [{ color: "#fff", quantity: 0 }],
          },
          
          imagen: 'https://firebasestorage.googleapis.com/v0/b/surtimas-18cd7.appspot.com/o/16917960165631691295997297-logo512%20-%20Copy.png?alt=media&token=8ac23ac1-35f9-47ad-ad4f-2ef18cb3635c'
        },
      ];

  return (
    <div >
        <Nav/>
        <div style={{marginTop:'150px'}}>
          <Gallery2 />

      </div>
        
    </div>
  )
}

export default AllProducts