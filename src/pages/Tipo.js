import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import Card from './Card';
import Card2 from './Card2';
import PriceFilter from './PriceFilter';
import FilterCategory from './FilterCategory';
import GenderRadioFilter from './GenderFilter';
import Card3 from './Card3';
import {AiOutlineDown} from 'react-icons/ai'
import useAuth from '../hooks/useAuth';
import Nav from './Nav';
import Search from './Search';
import Skeleton from './Skeleton';

function Tipo() {

    const [products, setProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState();
    

    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    const componentRef = useRef(null);

    const {auth} = useAuth()

    const {tipo} = useParams()

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

      const { cart, setCart, searchQuery, getCartProducts } = useContext(CartContext);

      
      

      useEffect(() => {
        getCartProducts(auth?.user)
      }, [auth])
    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getProducts = async (pageNumber) => {
    //         try {
    //             const response = await axios.get(`/productos?pageNumber=${pageNumber}`, {
    //                 signal: controller.signal
    //             });
    //             console.log(props.mujer)
    //             console.log(response.data);
    //             isMounted && setProducts(response.data);
    //             console.log(products[2].imagenes)
    //             setCurrentPage(pageNumber);
    //         } catch (err) {
    //             console.error(err);
    //             // navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }

    //     getProducts();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])


      const getProducts = async () => {
          try {
              const response = await axios.get(`/productos/tipo/${tipo}`);
              // console.log(props.mujer)
              console.log(response.data);
              setProducts(response.data);
              console.log(totalPages)
              
              // setCurrentPage(pageNumber);
          } catch (err) {
              console.error(err);
              // navigate('/login', { state: { from: location }, replace: true });
          }
      }

      useEffect(()=>{
        setProducts(null)
        getProducts()
      }, [tipo])

    //   useEffect(() => {
    //     const fetchTotalPages = async () => {
    //       try {
    //         const response = await axios.get('/productos');
    //         const totalProducts = response.data.length;
    //         const pages = Math.ceil(totalProducts / 40);
    //         setTotalPages(pages);
            
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    
    //     fetchTotalPages();
    //     getProducts(currentPage);
    //   }, [currentPage, searchQuery]);


    // // useEffect(() => {
    // //   getProducts(currentPage);
    // // }, [currentPage]);

    // const handlePageChange = (pageNumber) => {
    //   getProducts(pageNumber);
    // };
  


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
    <div>
      <Nav/>
      <div  style={{marginTop:'150px'}}>
      {searchQuery && <h4 style={{marginTop: '90px', marginLeft: '35px'}}>Busqueda: '{searchQuery}'</h4>}
    {searchQuery ? <Search/>

    :
      
      <div className='gallery-container-container' ref={componentRef}>
        
       
       
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
                                  {isGenderOpen && <GenderRadioFilter  onFilter={handleGenderFilter} />}
                                </div>
                                <button style={{fontSize: '15px'}} onClick={handleReset}>Reset</button>
                            </div>
                        
                    <div className='gallery-container'>


                    
                        {/* Display filtered products here */}
                        {filteredProducts.map((product, i) => (
                            <Card3 key={i}  titulo={product.titulo} img={product.imagenes[0]} precio={product.precio} product={product}/>
                        ))}
                        
                    </div>
                    </div>
                ) : 
                <div>
                    
                    <div className='filtros'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown /></p>
                            {isPriceOpen && <PriceFilter  products={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown /></p>
                                  {isCategoryOpen && <FilterCategory objects={products} onFilter={handleGenderFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter  onFilter={handleGenderFilter} />}
                                </div>
                                
                            </div>
                            {products ? <div className='gallery-container'>
                {products?.map((product, i) =>
                    // <Link to={`/productos/${product._id}`}>
                    <Card3 key={i} titulo={product.titulo} img={product.imagenes[0]} precio={product.precio} id={product._id} product={product} codigo={product.codigo}/>
                    // </Link>
                    )}
                </div> : <Skeleton flex='wrap'/>}
            </div>
            }
            {/* <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            className={`page ${page === currentPage && 'page-selected'}`}
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div> */}
        
        </div>}
      </div>
    </div>

  )
}

export default Tipo