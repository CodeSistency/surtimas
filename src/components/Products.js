import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BarCodeGen from "./BarCodeGen";
import QRcode from "./QRcode";

import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md"
import PriceFilter from "../pages/PriceFilter";
import FilterCategory from "../pages/FilterCategory";
import GenderRadioFilter from "../pages/GenderFilter";
import {AiOutlineDown} from 'react-icons/ai'

const Products = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState('mujer');

    const [reload, setReload] = useState()
    const [isLoading, setIsLoading] = useState()

    const handleFilter = filteredProducts => {
        setFilteredProducts(filteredProducts);
        console.log(filteredProducts)
        console.log('working')
      };

    function handleReset(){
      setFilteredProducts([])
    }

      const handleGenderFilter = (selectedSexo) => {
        setSelectedSexo(selectedSexo);
        console.log(selectedSexo)
        const updatedProducts = products.filter(
          obj => obj.sexo === selectedSexo
        );
        setFilteredProducts(updatedProducts);
        console.log(updatedProducts)
        console.log(filteredProducts)
        console.log('working')
      };
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/products', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
            } catch (err) {
                console.error(err);
                console.log(JSON.stringify(err));
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

   
    const handleDelete = async (id) => {

        let isMounted2 = true;
        const controller = new AbortController();
        console.log(id)
        
        
        try {
            const response = await axiosPrivate.delete(`products/${id}`,
            
        
        {
                signal: controller.signal
            });
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response?.data[4].imagenes[0]));
            
            
            navigate("/admin", { state: {from: location}, replace: true });
            navigate(-1);
        } catch (err) {
            console.error(err);
            console.log(JSON.stringify(err));
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted2 = false;
            controller.abort();
        }
    }

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

    return (
        <article className="admin-products">
            <div className="crear-producto-container">
                <h2>Lista de productos</h2>
                <Link className="create" to={"/admin/createProduct"} style={{color: "black", marginRight: "10"}}>Crear Producto</Link>

            </div>

            {filteredProducts?.length 
                ? (
                    <div>
                    <div className='table-container'>
                    <p style={{fontSize: '14px'}}>Total de productos: <strong>{filteredProducts?.length}</strong></p>
                    <div style={{padding: '10px 0'}} className='filtros-admin'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown /></p>
                            {isPriceOpen && <PriceFilter  products={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown /></p>
                                  {isCategoryOpen && <FilterCategory objects={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter products={products} onFilter={handleFilter} />}
                                </div>
                                <button style={{fontSize: '15px 3px'}} onClick={handleReset}>Reset</button>
                            </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nmro</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Precio Mayor</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredProducts?.map((product, index) => (
                                <tr key={index}>
                                <td>{index}</td>
                                <td>{product.titulo}</td>
                                <td>{product.precio}</td>
                                <td>{product.precio_mayor}</td>
                                <td>
                                    <img loading='lazy' src={product.imagenes[0]} style={{width: '25px'}} alt={`Imagen ${index}`} />
                                </td>
                                <td>
                                <Link  to={`products/${product._id}`} style={{color: "black"}}><MdOutlineModeEditOutline fontSize={27} style={{marginTop:'7px'}}/></Link>
                                </td>
                                <td>
                                <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={() => handleDelete(product._id)}/>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                ) : 
                <div>
                    <div className='table-container'>
                    <p style={{fontSize: '14px'}}>Total de productos: <strong>{products?.length}</strong></p>
                    <div style={{padding: '10px 3px'}} className='filtros-admin'>
                          <div className='price-container'>
                            <p onClick={handlePriceClick}>Precio <AiOutlineDown /></p>
                            {isPriceOpen && <PriceFilter  products={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleCategoryClick}>Categorias <AiOutlineDown /></p>
                                  {isCategoryOpen && <FilterCategory objects={products} onFilter={handleFilter} />}
                                </div>
                                <div className='price-container'>
                                  <p onClick={handleGenderClick}>Genero <AiOutlineDown /></p>
                                  {isGenderOpen && <GenderRadioFilter products={products} onFilter={handleFilter} />}
                                </div>
                                
                            </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nmro</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Precio Mayor</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr key={index}>
                                <td>{index}</td>
                                <td>{product.titulo}</td>
                                <td>{product.precio}</td>
                                <td>{product.precio_mayor}</td>
                                <td>
                                    <img loading='lazy' src={product.imagenes[0]} style={{width: '25px'}} alt={`Imagen ${index}`} />
                                </td>
                                <td>
                                <Link  to={`products/${product._id}`} style={{color: "black"}}><MdOutlineModeEditOutline fontSize={27} style={{marginTop:'7px'}}/></Link>
                                </td>
                                <td>
                                <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={() => handleDelete(product._id)}/>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    }
            
            {/* {products?.length
                ? (
                    
    <div className="table-container">
    <p style={{fontSize: '14px'}}>Total de productos: <strong>{products.length}</strong></p>
      <table className="table">
        <thead>
          <tr>
            <th>Nmro</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Precio Mayor</th>
            <th>Imagen</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
                <td>{index}</td>
              <td>{product.titulo}</td>
              <td>{product.precio}</td>
              <td>{product.precio_mayor}</td>
              <td>
                <img loading='lazy' src={product.imagenes[0]} style={{width: '25px'}} alt={`Imagen ${index}`} />
              </td>
              <td>
              <Link  to={`products/${product._id}`} style={{color: "black"}}><MdOutlineModeEditOutline fontSize={27} style={{marginTop:'7px'}}/></Link>
              </td>
              <td>
              <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={() => handleDelete(product._id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                ) : <div class="lds-dual-ring"></div>
            } */}
        </article>
    );
};

export default Products;