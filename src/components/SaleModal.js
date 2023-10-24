import React from 'react'
import { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SaleModal({productos, closeModal,  setResults}) {

    console.log(productos)
    const [metodo, setMetodo] = useState()
    const [referencia, setReferencia] = useState()

  

    const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

    const[error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState()

    const [success, setSuccess] = useState(false)

    const [revenue, setRevenue] = useState()

    const navigate = useNavigate();
    const location = useLocation();

    const newSale = async () => {

        let isMounted = true;
        const controller = new AbortController();

    
        try {
            setError(false)
            setIsLoadingCreate(true)
            const response = await axiosPrivate.post('sales', 
            JSON.stringify({productos, metodo, referencia, total: revenue}),
        
            { 
                signal: controller.signal,
                
            });
            console.log(JSON.stringify(response?.data));
            setSuccess(true)
            setResults([])
            closeModal()
            navigate("/admin/reader", { state: {from: location}, replace: true });
            
            // navigate(-1);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
            setErrMsg(err)
            setError(true)
        }
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const calculateTotalRevenue = () => {
        let totalRevenue = 0;
        productos.forEach((product) => {
          Object.values(product.tallas).forEach((colors) => {
            colors.forEach((color) => {
              const sold = parseInt(color.sold, 10) || 0;
              const precio = parseInt(product.precio, 10) || 0;
              totalRevenue += sold * precio;
            });
          });
        });
        
        return totalRevenue;
        // setTotal(totalRevenue)
      };

      const calculateTotalPrendas = () => {
        let totalRevenue = 0;
        productos.forEach((product) => {
          Object.values(product.tallas).forEach((colors) => {
            colors.forEach((color) => {
              const sold = parseInt(color.deseo, 10) || 0;
              totalRevenue += sold
            });
          });
        });
        
        return totalRevenue;
        // setTotal(totalRevenue)
      };

      

  return (
    <div className='confirmar-container'>
        <div className='confirmar'>
            <h1>Confirmar Pago</h1>
            <div onClick={closeModal} className='cerrar'>
                <p>X</p>
            </div>
        </div>
        <hr></hr>
        <div>
            <h3>Informacion venta:</h3>
            <p>Total de Unidades: {calculateTotalPrendas()}</p>
            {!revenue &&<p>Total de Ingresos: {calculateTotalRevenue()}</p>}
            <input 
                    placeholder='Ingresar cantidad manual'
                    type='number'
                    className='input-descripcion'
                    style={{padding: '7px'}}
                    onChange={(e) => setRevenue(e.target.value)}
                />
            <p>Cantidad de Items: {productos?.length}</p>
        </div>
        <hr></hr>
        <div>
            <select style={{padding: '10px 20px', marginLeft: '-2px', marginTop: '10px'}} value={metodo} onChange={(e) => setMetodo(e.target.value)}>
            <option >Seleccione Metodo</option>
            <option value="pago movil">Pago Movil</option>
                <option value="transferencia">Transferencia</option>
                <option value="divisa">Divisa</option>
            </select>
            {metodo == 'pago movil' &&
            <div>
                <h3>Referencia</h3>
                <input 
                    placeholder='Ingresa referencia'
                    className='input-descripcion'
                    style={{padding: '7px'}}
                    onChange={(e) => setReferencia(e.target.value)}
                />
            </div>
            }
        </div>
        <button className='btn' onClick={newSale}>
          {error ? 'Intentar de nuevo' : success ? 'Venta Registrada' : isLoadingCreate ? 'Cargando...' : 'Registrar venta'}
      </button>
      {errMsg && <p>{`${errMsg}`}</p>}

    </div>
  )
}

export default SaleModal