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
import Nav from './Nav';

function Mujer() {

    const [products, setProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState();
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const componentRef = useRef(null);
    
        

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axios.get('/productos/genero/mujer', {
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

    
    const [isPriceOpen, setPriceOpen] = useState(false);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isGenderOpen, setGenderOpen] = useState(false);

    const handleFilter = filteredProducts => {
      setFilteredProducts(filteredProducts);
    };
  function handleReset(){
    setFilteredProducts([])
  }

    const handleGenderFilter = (selectedSexo) => {
      setSelectedSexo(selectedSexo);
      const updatedProducts = products.filter(
        obj => selectedSexo === 'hombre' || obj.sexo === selectedSexo
      );
      setFilteredProducts(updatedProducts);
    };
  
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
  
        
  
          
     
  
        // useEffect(() => {
        //   if (location.pathname === '/productos/mujer' && props.mujer) {
  
        //     const handleGenderFilterNow = () => {
        //       const updatedProducts = objetos.filter(obj => selectedSexo === 'mujer' || obj.sexo === 'mujer');
        //       setFilteredProducts(updatedProducts);
        //     };
  
        //     handleGenderFilterNow();
        //   }
  
        //   console.log(filteredProducts)
        //   console.log(location.pathname)
        // }, [location.pathname]);


  return (
    <div >
        <Nav/>
        <div style={{marginTop:'140px'}}>
        {products?.length ? <div className='gallery-container-container' ref={componentRef}>
        
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
                                {/* <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter mujer={props.mujer} onFilter={handleGenderFilter} />}
                                </div> */}
                                <button style={{fontSize: '15px'}} onClick={handleReset}>Reset</button>
                            </div>
                        
                    <div className='gallery-container'>


                    
                        {/* Display filtered products here */}
                        {filteredProducts.map((product, i) => (
                            <Card2 key={i}  titulo={product.titulo} img={product.imagenes[0]} precio={product.precio} product={product}/>
                        ))}
                        
                    </div>
                    </div>
                ) : 
                <div>
                    
                    <div className='filtros'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown onClick={handlePriceClick}/></p>
                            {isPriceOpen && <PriceFilter  products={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown onClick={handleCategoryClick}/></p>
                                  {isCategoryOpen && <FilterCategory objects={products} onFilter={handleGenderFilter} />}
                                </div>
                                {/* <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter mujer={props.mujer} onFilter={handleGenderFilter} />}
                                </div> */}
                                
                            </div>
                <div className='gallery-container'>
                {products?.map((product, i) =>
                    // <Link to={`/productos/${product._id}`}>
                    <Card3 key={i} titulo={product.titulo} img={product.imagenes[0]} precio={product.precio} id={product._id} product={product}/>
                    // </Link>
                    )}
                </div>
            </div>
            }
        
    </div> : <p>Cargando</p>}

      </div>
        
    </div>
  )
}

export default Mujer