import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Card from './Card';
import Card2 from './Card2';
import PriceFilter from './PriceFilter';
import FilterCategory from './FilterCategory';
import GenderRadioFilter from './GenderFilter';
import Card3 from './Card3';
import {AiOutlineDown} from 'react-icons/ai'

function Gallery(props) {

    const [products, setProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState(props.mujer);
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    const componentRef = useRef(null);

    const handleFilter = filteredProducts => {
        setFilteredProducts(filteredProducts);
      };
    function handleReset(){
      setFilteredProducts([])
    }

      const handleGenderFilter = (selectedSexo) => {
        setSelectedSexo(selectedSexo);
        const updatedProducts = objetos.filter(
          obj => selectedSexo === 'hombre' || obj.sexo === selectedSexo
        );
        setFilteredProducts(updatedProducts);
      };

      
      

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axios.get('/productos', {
                    signal: controller.signal
                });
                console.log(props.mujer)
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
          _id: 6,
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
            _id: 5,
            titulo: 'card',
            precio: 8,
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
            _id: 4,
            titulo: 'card',
            precio: 5,
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
            _id: 3,
            titulo: 'card',
            precio: 7,
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
            _id: 7,
            titulo: 'card',
            precio: 15,
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
            _id: 2,
            titulo: 'card',
            precio: 13,
            tipo: 'pantalon',
            sexo: 'hombre',
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
            _id: 8,
            titulo: 'card',
            precio: 20,
            tipo: 'camisa',
            sexo: 'hombre',
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
          _id: 1,
          titulo: 'card',
          precio: 12,
          tipo: 'camisa',
          sexo: 'hombre',
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

      const [isPriceOpen, setPriceOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isGenderOpen, setGenderOpen] = useState(false);

      const handlePriceClick = () => {
        setPriceOpen(!isPriceOpen);
        setGenderOpen(false);
        setCategoryOpen(false);
      };
    
      const handleCategoryClick = () => {
        setCategoryOpen(!isCategoryOpen);
        setGenderOpen(false);
        setPriceOpen(false);
      };
    
      const handleGenderClick = () => {
        setGenderOpen(!isGenderOpen);
        setCategoryOpen(false);
        setPriceOpen(false);
      };

      useEffect(() => {
        const handleOutsideClick = (event) => {
          if (componentRef.current && !componentRef.current.contains(event.target)) {
            setGenderOpen(false);
            setCategoryOpen(false);
            setPriceOpen(false);
          }
        };
    
        window.addEventListener('click', handleOutsideClick);
    
        return () => {
          window.removeEventListener('click', handleOutsideClick);
        };
      }, []);

      

        
   

      useEffect(() => {
        if (location.pathname === '/productos/mujer' && props.mujer) {

          const handleGenderFilterNow = () => {
            const updatedProducts = objetos.filter(obj => selectedSexo === 'mujer' || obj.sexo === 'mujer');
            setFilteredProducts(updatedProducts);
          };

          handleGenderFilterNow();
        }

        console.log(filteredProducts)
        console.log(location.pathname)
      }, [location.pathname]);


  return (
    <div className='gallery-container-container' ref={componentRef}>
        
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
       
        {filteredProducts?.length 
                ? (
                    <div>
                        <div className='filtros'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown /></p>
                            {isPriceOpen && <PriceFilter  products={filteredProducts} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown /></p>
                                  {isCategoryOpen && <FilterCategory objects={filteredProducts} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter mujer={props.mujer} onFilter={handleGenderFilter} />}
                                </div>
                                <button style={{fontSize: '15px'}} onClick={handleReset}>Reset</button>
                            </div>
                        
                    <div className='gallery-container'>


                    
                        {/* Display filtered products here */}
                        {filteredProducts.map((product, i) => (
                            <Card2 key={i}  titulo={product.titulo} img={product.imagen} precio={product.precio} product={product}/>
                        ))}
                        
                    </div>
                    </div>
                ) : 
                <div>
                    
                    <div className='filtros'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown /></p>
                            {isPriceOpen && <PriceFilter  products={objetos} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown /></p>
                                  {isCategoryOpen && <FilterCategory objects={objetos} onFilter={handleGenderFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter mujer={props.mujer} onFilter={handleGenderFilter} />}
                                </div>
                                
                            </div>
                <div className='gallery-container'>
                {objetos.map((product, i) =>
                    // <Link to={`/productos/${product._id}`}>
                    <Card3 key={i} titulo={product.titulo} img={product.imagen} precio={product.precio} id={product._id} product={product}/>
                    // </Link>
                    )}
                </div>
            </div>
            }
        
    </div>
  )
}

export default Gallery