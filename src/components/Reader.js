
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {MdDeleteForever} from "react-icons/md"
import {BsFillPlusCircleFill} from "react-icons/bs"
import { QrReader } from 'react-qr-reader';

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
        const filteredProduct = products.find((product) => product._id.toString() === result);
        console.log("Scanned QR:", result);
        console.log("Filtered Product:", filteredProduct);
        console.log("Products Array:", products);
        if (filteredProduct) {
          console.log(filteredProduct);
          setResults((prevResults) => [
            ...prevResults,
            { titulo: filteredProduct.titulo, precio: filteredProduct.precio },
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
        const productMatchesId = product._id.toString().includes(searchInput);
  
        return productMatchesTitle || productMatchesId;
      });
  
      return filteredProducts;
  }
  
  function addProductToResults(product) {
    setResults((prevResults) => [...prevResults, product]);
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
    
      // const onChange = (productCode, size, index, value) => {
      //   // Check if the input represents a number (quantity) or 'sold' property
      //   const intValue = parseInt(value, 10);
      //   if (!isNaN(intValue)) {
      //     setQuantityChanges((prevChanges) => ({
      //       ...prevChanges,
      //       [`${productCode}-${size}-${index}`]: intValue,
      //     }));
      //   } else {
      //     setResults((prevResults) => {
      //       const updatedResults = prevResults.map((product) => {
      //         if (product.codigo === productCode) {
      //           const colors = product.tallas[size];
      //           if (!colors || index >= colors.length) return product;
    
      //           colors[index].sold = value; // Update 'sold' property
      //         }
      //         return product;
      //       });
      //       return updatedResults;
      //     });
      //   }
      // };
    

      // const onChange = (productCode, size, index, value) => {
      //   // Check if the input represents a number (quantity) or 'sold' property
      //   const intValue = parseInt(value, 10);
      //   if (!isNaN(intValue)) {
      //     setQuantityChanges((prevChanges) => ({
      //       ...prevChanges,
      //       [`${productCode}-${size}-${index}`]: intValue,
      //     }));
      //   } else {
      //     setResults((prevResults) => {
      //       const updatedResults = prevResults.map((product) => {
      //         if (product.codigo === productCode) {
      //           const colors = product.tallas[size];
      //           if (!colors || index >= colors.length) return product;
    
      //           colors[index].sold = value; // Update 'sold' property
      //         }
      //         return product;
      //       });
      //       return updatedResults;
      //     });
      //   }
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
      // };
    
      // const calculateTotalRevenue = () => {
      //   let totalRevenue = 0;
      //   results.forEach((product) => {
      //     const colors = product.tallas;
      //     Object.keys(colors).forEach((size) => {
      //       colors[size].forEach((color) => {
      //         const sold = color.sold + (parseInt(quantityChanges[`${product.codigo}-${size}-${color._id}`], 10) || 0);
      //         const price = product.precio;
      //         totalRevenue += sold * price;
      //       });
      //     });
      //   });
      //   return totalRevenue;
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
      // };
      

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
      function removeItem(codigo) {
        setResults(prevItems => prevItems.filter(item => item.codigo !== codigo))
        
    }
    return (
      <div className="dashboard-reader admin-container">
        <AdminNav />
        <div className="grid-productos">

            <div className="productos">
            {results?.map((product) => (
              <div key={product.codigo} className="lista-productos">
                <h2 className="producto">{product.titulo}</h2>
                <p className="producto">{product.codigo}</p>
                <p className="producto">{`${product.precio}$`}</p>
                {Object.entries(product.tallas).map(([size, colors]) => (
                  <div className="lista-productos" key={`${product.codigo}-${size}`}>
                    <h4 className="producto"> {size}</h4>
                    {colors.map((color, index) => (
                      <div className="lista-productos" key={color._id}>
                        <div className="producto" style={{backgroundColor: color.color, borderRadius: "50%", border: "1px solid black", height: "5", width: "5"}}></div>
                        <p className="producto">
                          Quantity:{" "}
                          {color.quantity - (parseInt(quantityChanges[`${product.codigo}-${size}-${index}`], 10) || 0)}
                        
                        </p>
                        <input
                          style={{ width: "10", padding: ".9em" }}
                          className="producto"
                          type="number"
                          value={color.sold || 0}
                          onChange={(e) =>
                            onChange(product.codigo, size, index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
                {/* <MdDeleteForever color="black" style={{padding: "0 5px", color: "black"}} onClick={() => removeItem(product.codigo)}/> */}
                <p onClick={() => removeItem(product.codigo)}>Borrar</p>
              </div>
            ))}
            
          </div>
          {results.length ? <div className="add-producto">
            {/* <button onClick={handleApplyChanges}>Apply Changes</button> */}
            <p><strong>Total:</strong> {calculateTotalRevenue()}</p>
            <button className="btn" style={{fontWeight: "700", padding: "5px 30px", color:"black"}} onClick={newSale}>Venta</button>
            
          </div>: <p></p>}
        </div>
    
        <section className="qr-reader">
          <h2>Lector QR</h2>
          {qrReaderActive && ( // Render the QR reader only if qrReaderActive is true
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
          />
        )}
        <button className="btn" style={{marginBottom: "5px", marginTop: "0"}}  onClick={toggleQrReader}>
          {qrReaderActive ? 'Desactivar Lector QR ' : 'Activar Lector QR'}
        </button>
          {scanResult && (
            <div id="reader">
              Success: {scanResult}

            </div>
          ) }
          
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
        </ul>

        {/* <ul>
                {results?.map((result, index) => (
                  <li key={index}>
                    <strong>Nombre:</strong> {result.titulo}, <strong>Price:</strong>{" "}
                    {result.precio}
                  </li>
                ))}
              </ul> */}
        </section>
         </div>
    );
  }

  
export default Reader;