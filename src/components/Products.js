import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BarCodeGen from "./BarCodeGen";
import QRcode from "./QRcode";
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md"

const Products = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    

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
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    // const handleDelete = async (id) => {
    //     let isMounted2 = true;
    //     const controller = new AbortController();
    //     console.log(id)

    //     try {
    //          const response = await axiosPrivate.delete(`products/${id}`,
    //          {
    //             signal: controller.signal
    //          }
                
    //         );
    //         console.log(response.data);
            
    //     } catch (err) {
    //         console.error(err);
    //         // navigate('/login', { state: { from: location }, replace: true });
    //     }

    //     return () => {
    //         isMounted2 = false;
    //         controller.abort();
    //     }
    // }
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
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted2 = false;
            controller.abort();
        }
    }

    return (
        <article className="admin-products">
            <div className="crear-producto-container">
                <h2>Lista de productos</h2>
                <Link className="create" to={"/admin/createProduct"} style={{color: "black", marginRight: "10"}}>Crear Producto</Link>

            </div>
            {products?.length
                ? (
                    // <ul>
                    //     {products.map((product, i) => 
                    //         <li className="product-list" key={i}>
                    //             <p>{product?.titulo}</p>
                    //             <p>{product?.precio}</p>
                    //             <p>{product?.cantidad}</p>

                                
                    //             <Link  to={`products/${product._id}`} style={{color: "black"}}><MdOutlineModeEditOutline/></Link>
                    //             <div style={{cursor: 'pointer'}}><MdDeleteForever  onClick={() => handleDelete(product._id)}/></div>
                                
                    //         </li>)}
                    // </ul>
                    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
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
              <td>{product.titulo}</td>
              <td>{product.precio}</td>
              <td>{product.precio_mayor}</td>
              <td>
                <img src={product.imagenes[0]} style={{width: '25px'}} alt={`Imagen ${index}`} />
              </td>
              <td>
              <Link  to={`products/${product._id}`} style={{color: "black"}}><MdOutlineModeEditOutline fontSize={27} style={{marginTop:'7px'}}/></Link>
              </td>
              <td>
              <MdDeleteForever fontSize={27} style={{marginTop:'7px'}} onClick={() => handleDelete(product._id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                ) : <div class="lds-dual-ring"></div>
            }
        </article>
    );
};

export default Products;