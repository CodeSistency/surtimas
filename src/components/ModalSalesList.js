import React from 'react'

function ModalSalesList({productos, closeModal}) {
    console.log(productos)
  return (
    <div className='admin-products'>
         <div className='productos' style={{height: '90%'}}>
                <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Codigo</th>
                            {productos?.map((product) =>
          Object.keys(product.tallas).map((size) => (
            <th key={`${product.codigo}-${size}`}>{size}</th>
          ))
        )}
                        </tr>
                        </thead>
                        <tbody>
                            {productos?.map((product, index) => (
                                <tr key={index}>
                                <td>{index}</td>
                                <td>{product?.titulo}</td>
                                <td>{product?.precio}</td>
                                <td>${product?.codigo}</td>
                                
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
                    
                    {`Cantidad: ${color.sold}`}
                  </p>
                  
                </div>
              ))}
            </td>
          ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
                <button style={{width: '100%', padding: '5px'}} onClick={closeModal}>Cerrar</button>
    </div>
  )
}

export default ModalSalesList