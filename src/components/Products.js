import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BarCodeGen from "./BarCodeGen";
import QRcode from "./QRcode";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"

import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md"
import PriceFilter from "../pages/PriceFilter";
import FilterCategory from "../pages/FilterCategory";
import GenderRadioFilter from "../pages/GenderFilter";
import {AiOutlineDown} from 'react-icons/ai'
import {LiaSearchSolid} from 'react-icons/lia'
import Loader from "../pages/Loader";
import ModalDelete from "../pages/ModalDelete";


const Products = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSexo, setSelectedSexo] = useState('mujer');

    const [reload, setReload] = useState()
    const [isLoading, setIsLoading] = useState()

    const [searchInput, setSearchInput] = useState()

    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteMsg, setDeleteMsg] = useState(false)

    const [modalOpen, setModalOpen] = useState(false);

    
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

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

      const getProducts = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get('/products', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setProducts(response.data);
            setIsDeleting(false)
        } catch (err) {
            console.error(err);
            console.log(JSON.stringify(err));
            navigate('/login', { state: { from: location }, replace: true });
        }

        return () => {
          isMounted = false;
          controller.abort();
      }
    }
    

    useEffect(() => {
        

        getProducts();

        
    }, [isDeleting])

   
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
            // console.log(JSON.stringify(response?.data[4].imagenes[0]));
            
            
          closeModal()
          setIsDeleting(true)
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

    function handleSearchInputChange(event) {
      setSearchInput(event.target.value);
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

        function filterProductsByTitle() {
          if (!products || !searchInput) {
            return []; // Si no hay productos cargados o el input de búsqueda está vacío, devolvemos un array vacío
          }
      
          const filteredProducts = products.filter((product) => {
              const lowerSearchInput = searchInput.toLowerCase();
              const lowerProductTitle = product.titulo.toLowerCase();
              const productMatchesTitle = lowerProductTitle.includes(lowerSearchInput);
              const productMatchesId = product.codigo.toString().includes(searchInput);
        
              return productMatchesTitle || productMatchesId;
            });
            setFilteredProducts(filteredProducts)
            return filteredProducts;
            
        }

        useEffect(() => {
          filterProductsByTitle()
        }, [searchInput])

        const calculateTotalQuantity = () => {
          let totalQuantity = 0;
        
          products?.forEach((product) => {
            Object.values(product?.tallas).forEach((colors) => {
              colors.forEach((color) => {
                totalQuantity += color.quantity;
              });
            });
          });
        
          return totalQuantity;
        };

        //revisar

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
                    <p style={{fontSize: '14px'}}>Cantidad total: <strong>{calculateTotalQuantity()}</strong></p>
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
                            <div className="search-nav">
                                  <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative-nav">
                                      <input type="text" className="input-search-nav " onChange={handleSearchInputChange} name="txt"  />
                                      <LiaSearchSolid fontSize={25} style={{top:'50%'}}className="search-button-nav" />
                                  </form>
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
                    <p style={{fontSize: '14px'}}>Cantidad total: <strong>{calculateTotalQuantity()}</strong></p>
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
                            <div className="search-nav">
                                  <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative-nav">
                                      <input type="text" className="input-search-nav " onChange={handleSearchInputChange} name="txt"  />
                                      <LiaSearchSolid fontSize={25} style={{top:'50%'}}className="search-button-nav" />
                                  </form>
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
                                <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={openModal}/>
                                {/* <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={() => handleDelete(product._id)}/> */}
                                {modalOpen && (
        <ModalDelete closeModal={closeModal} isDeleting={setIsDeleting} product={product}  handleDelete={handleDelete}/>
      )}
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
            {isDeleting && <Loader />}
        </article>
    );
};

export default Products;