
import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md"
import {BsFillPlusCircleFill} from "react-icons/bs"
import { QrReader } from 'react-qr-reader';
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { BsQrCodeScan } from 'react-icons/bs'
import ModalComponent from "./Modal";
import {LiaSearchSolid} from 'react-icons/lia'
import React from 'react'
import AdminNav from "./AdminNav";

function Reader() {
    const [results, setResults] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const [products, setProducts] = useState();
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [scannerInitialized, setScannerInitialized] = useState(false);
    const [total, setTotal] = useState()
    const [qrReaderActive, setQrReaderActive] = useState(false);
    const [searchInput, setSearchInput] = useState(''); 
    const [quantityChanges, setQuantityChanges] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
    

    const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const [ancho, setAncho] = useState(false)

  // if(windowWidth.current > 600){
  //   setAncho(true)
  // }
  
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
  
      const getProducts = async () => {
        try {
          const response = await axiosPrivate.get('/products', {
            signal: controller.signal,
          });
          console.log(response.data);
        isMounted && setProducts(response.data);
          console.log(products)
          setProductsLoaded(true);
        } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      };
  
      if (!productsLoaded) { // Verificar si los productos aún no se han cargado
        getProducts();
      }
  
      return () => {
        isMounted = false;
        controller.abort();
      };
    }, [productsLoaded]);
  
    function filterProducts(result) {
        const filteredProduct = products.find((product) => product.codigo.toString() === result);
        console.log("Scanned QR:", result);
        console.log("Filtered Product:", filteredProduct);
        console.log("Products Array:", products);
        if (filteredProduct) {
          console.log(filteredProduct);
          setResults((prevResults) => [
            ...prevResults,
            filteredProduct,
          ]);
        }
      }
      
  

    useEffect(() => {
        console.log("Results updated:", results);
        console.log("Products", products)
      }, [results, products]);

      useEffect(() => {
        if (scanResult && productsLoaded) { // Verificar si ambos scanResult y products están cargados
          filterProducts(scanResult);
        }
      }, [scanResult, products, productsLoaded]);

        // Function to handle changes in the search input
  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  // Function to filter products by title
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
  
      return filteredProducts;
  }
  
  function addProductToResults(product) {
    setResults((prevResults) => [...prevResults, product]);
    setSearchInput('')
  }
  

    function toggleQrReader() {
        setQrReaderActive((prevState) => !prevState);
      }

      function initializeSoldData(product) {
        const updatedTallas = {};
        for (const size in product.tallas) {
          updatedTallas[size] = product.tallas[size].map((color) => ({
            ...color,
            sold: 0, // Initialize 'sold' property to 0
          }));
        }
        return {
          ...product,
          tallas: updatedTallas,
        };
      }
    
      

      const newSale = async () => {

        let isMounted = true;
        const controller = new AbortController();

    
        try {
            const response = await axiosPrivate.post('sales', 
            JSON.stringify({productos: results}),
        
            { 
                signal: controller.signal,
                
            });
            console.log(JSON.stringify(response?.data));
            
            // navigate("/admin", { state: {from: location}, replace: true });
            // navigate(-1);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }
    
      // const registerSales = async (salesData) => {
      //   try {
      //     const response = await axios.post('/sales', salesData);
      //     return response.data;
      //   } catch (error) {
      //     console.error('Error registering sales:', error);
      //     throw error;
      //   }
      // };
      
      // const onChange = (productCode, size, index, value) => {
      //   setQuantityChanges((prevChanges) => ({
      //     ...prevChanges,
      //     [`${productCode}-${size}-${index}`]: value,
      //   }));
      // };
    
      // const handleApplyChanges = () => {
      //   const updatedResults = results.map((product) => {
      //     const colors = product.tallas;
      //     Object.keys(colors).forEach((size) => {
      //       colors[size].forEach((color, index) => {
      //         const changeKey = `${product.codigo}-${size}-${index}`;
      //         const changeValue = parseInt(quantityChanges[changeKey], 10);
      //         if (!isNaN(changeValue)) {
      //           color.quantity -= changeValue;
      //         }
      //       });
      //     });
      //     return product;
      //   });
    
      //   setResults(updatedResults);
      //   setQuantityChanges({});
      //   console.log(results)
      // };
      const onChange = (productCode, size, index, value) => {
        const intValue = parseInt(value, 10);
        setResults((prevResults) => {
          const updatedResults = prevResults.map((product) => {
            if (product.codigo === productCode) {
              const colors = product.tallas[size];
              if (!colors || index >= colors.length) return product;
      
              if (!isNaN(intValue)) {
                // If the input is a number, update the sold property
                const newSoldValue = Math.max(0, intValue);
                const quantityChange = newSoldValue - (colors[index].sold || 0); // Calculate the change in sold quantity
                colors[index].sold = intValue;
                colors[index].quantity -= quantityChange; // Decrease the quantity
              }
            }
            return product;
          });
          return updatedResults;
        });
      };

      const calculateTotalRevenue = () => {
        let totalRevenue = 0;
        results.forEach((product) => {
          Object.values(product.tallas).forEach((colors) => {
            colors.forEach((color) => {
              const sold = parseInt(color.sold, 10) || 0;
              const precio = parseInt(product.precio, 10) || 0;
              totalRevenue += sold * precio;
            });
          });
        });
        return totalRevenue;
        setTotal(totalRevenue)
      };

      const totalRevenue = calculateTotalRevenue()
      
      
      
      
      
      
    
      const handleApplyChanges = () => {
        const updatedResults = results.map((product) => {
          const colors = product.tallas;
          Object.keys(colors).forEach((size) => {
            colors[size].forEach((color, index) => {
              const changeKey = `${product.codigo}-${size}-${index}`;
              const changeValue = parseInt(quantityChanges[changeKey], 10);
              if (!isNaN(changeValue)) {
                color.quantity -= changeValue;
              }
            });
          });
          return product;
        });
    
        setResults(updatedResults);
        setQuantityChanges({});
      };
    
      // const calculateTotalRevenue = () => {
      //   let totalRevenue = 0;
      //   results.forEach((product) => {
      //     const colors = product.tallas;
      //     Object.keys(colors).forEach((size) => {
      //       colors[size].forEach((color) => {
      //         const sold = color.sold + (parseInt(quantityChanges[`${product.codigo}-${size}-${color.id}`], 10) || 0);
      //         const price = product.precio;
      //         totalRevenue += sold * price;
      //       });
      //     });
      //   });
      //   return totalRevenue;
      // };
      useEffect(() =>{
        console.log(quantityChanges)
      }, [quantityChanges])

      function removeItem(codigo) {
        setResults(prevItems => prevItems.filter(item => item.codigo !== codigo))
        
    }

    const qrReaderConstraints = {
      facingMode: 'environment',
    };

    return (
      <div className="dashboard-reader admin-container modal-container">
        <AdminNav />
        
        <div className="grid-productos">
          

        <div className="productos">
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Codigo</th>
        <th>Precio</th>
        <th>Actualizar</th>
        <th>Borrar</th>
        {results?.map((product) =>
          Object.keys(product.tallas).map((size) => (
            <th key={`${product.codigo}-${size}`}>{size}</th>
          ))
        )}
      </tr>
    </thead>
    <tbody>
      {results?.map((product) => (
        <tr key={product.codigo}>
          <td>{product.titulo}</td>
          <td>{product.codigo}</td>
          <td>{`${product.precio}$`}</td>
          <td><MdOutlineModeEditOutline fontSize={30} onClick={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}/></td>
          <td><MdDeleteForever fontSize={40} color="black" style={{padding: "0 5px", color: "black"}} onClick={() => removeItem(product.codigo)}/></td>
          
          {Object.entries(product.tallas).map(([size, colors]) => (
            <td key={`${product.codigo}-${size}`}>
              {colors.map((color, index) => (
                <div className='lista-productos' key={color._id}>
                  <div
                    style={{
                      backgroundColor: color.color,
                      borderRadius: "50%",
                      border: "1px solid black",
                      height: "30px",
                      width: "30px"
                    }}
                  ></div>
                  <p style={{padding: '0 8px'}}>
                    
                    {`Cantidad: ${color.quantity - (parseInt(quantityChanges[`${product.codigo}-${size}-${index}`], 10) || 0)}`}
                  </p>
                  <input
                    style={{ width: "60px", padding: ".9em" }}
                    type="number"
                    value={color.sold || 0}
                    onChange={(e) =>
                      onChange(product.codigo, size, index, e.target.value)
                    }
                  />
                </div>
              ))}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


{isModalOpen && selectedProduct && (
        <ModalComponent
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          handleApplyChanges={handleApplyChanges}
          setResults={setResults} 
          results={results}
        />
      )}

          
          {results.length ? <div className="add-producto">
            {/* <button onClick={handleApplyChanges}>Apply Changes</button> */}
            <p><strong>Total:</strong> {calculateTotalRevenue()}</p>
            <button className="btn" style={{fontWeight: "700", padding: "5px 30px", color:"black"}} onClick={newSale}>Venta</button>
            
          </div>: <p></p>}
        </div>
    
      <section className="qr-reader">
          
          <div className="lector">
          <h2>Lector QR</h2>
          <hr style={{margin: '15px 0'}}/>
          {/* <div className="search">
    <form name="search search-relative" className="form search-relative">
        <input value={searchInput}
            onChange={handleSearchInputChange} type="text" className="input-search " name="txt" />
        <IoCartOutline className="search-button" />
    </form>
    
     </div> */}
     <div className='nav-link-search-2'>
                  <div className="search-nav-2">
                    <form style={{paddingBottom: '0'}} name="search search-relative-2" className=" search-relative-nav-2">
                        <input type="text" value={searchInput} className="input-search-nav-2 " onChange={handleSearchInputChange} name="txt"  />
                        <LiaSearchSolid fontSize={25} style={{top:'50%'}}className="search-button-nav-2" />
                    </form>
                  </div>
              </div>
          </div>
          
     {searchInput && <ul style={{marginTop:'65px'}} className="add-productos">
          {filterProductsByTitle().map((product) => (
            <li key={product._id} className="add-producto">
              <p><strong>Producto:</strong> {product.titulo}</p>
              <BsFillPlusCircleFill onClick={() => addProductToResults(product)} fontSize={30}/>

            </li>
          ))}
        </ul>}

        
         {qrReaderActive && (
           // Render the QR reader only if qrReaderActive is true
           <div className="modal-overlay">
            <div className="qr-content">

             <QrReader
               onResult={(result, error) => {
                 if (!!result) {
                   setScanResult(result?.text);
                 }
                 if (!!error) {
                   console.info(error);
                 }
               }}
               style={{ width: '100%' }}
               constraints={qrReaderConstraints}
             />
             <button style={{width: '100%', color:'white'}} onClick={toggleQrReader}>Desactivar</button>
             {scanResult && (
            <div id="reader">
              Success: {scanResult}
            </div>
          ) }
            </div>

           </div>
        )}
        {/* <button className="btn" style={{marginBottom: "5px", marginTop: "0"}}  onClick={toggleQrReader}>
          {qrReaderActive ? 'Desactivar Lector QR ' : 'Activar Lector QR'}
        </button>
          {scanResult && (
            <div id="reader">
              Success: {scanResult}

            </div>
          ) } */}
{/*           
          <h4>Buscador de producto</h4>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <ul className="add-productos">
          {filterProductsByTitle().map((product) => (
            <li key={product._id} className="add-producto">
              <p><strong>Producto:</strong> {product.titulo}</p>
              <BsFillPlusCircleFill onClick={() => addProductToResults(product)} fontSize={30}/>

            </li>
          ))}
        </ul> */}

        {/* <ul>
                {results?.map((result, index) => (
                  <li key={index}>
                    <strong>Nombre:</strong> {result.titulo}, <strong>Price:</strong>{" "}
                    {result.precio}
                  </li>
                ))}
              </ul> */}
              <div className="scan">
                {/* <p>Scanner</p> */}
              <BsQrCodeScan fontSize={50} onClick={toggleQrReader}/>
              </div>
             
        </section>
      
         </div>
    );
  }

  
export default Reader;