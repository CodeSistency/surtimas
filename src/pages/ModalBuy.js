import React, { useEffect, useState } from 'react';
import ReactWhatsapp from 'react-whatsapp';

const ModalBuy = (props) => {
  const { closeModal, product, user } = props;

  console.log(product)

  const [quantityChangesModal, setQuantityChangesModal] = useState({});
  const [results, setResults] = useState()
  
  const onChangeModal = (size, index, value) => {
    // applyChangesModal()
    const changeKey = `${product.codigo}-${size}-${index}`;
    setQuantityChangesModal((prevChanges) => ({
      ...prevChanges,
      [changeKey]: parseInt(value, 10),
    }));
    console.log(changeKey)
    console.log(quantityChangesModal)
    
  };

  useEffect(() =>{
    applyChangesModal()
  },[quantityChangesModal])

  const applyChangesModal = () => {
    
      
          const updatedTallas = { ...product.tallas };
          Object.keys(updatedTallas).forEach((size) => {
            updatedTallas[size].forEach((color, index) => {
              const changeKey = `${product.codigo}-${size}-${index}`;
              const changeValue = parseInt(quantityChangesModal[changeKey], 10) || 0;
              const desireDifference = changeValue - color.deseo;
              color.deseo = changeValue
              color.quantity -= desireDifference;
              
              
            });
            setResults([{...product, tallas: updatedTallas}])
            return { ...product, tallas: updatedTallas };
          });
         
    console.log(results)
      
    };


  return (
    // <div className='modal-overlay'>

    
    // <div className="modal-buy">
    <div>

    
    <div >
      <div className="modal-content-buy">
        {/* <h3>¿Estás seguro de realizar esta compra?</h3> */}

        <div className='modal-info' style={{margin: '15px 0', border: 'none'}}>
          <img style={{width: '50px', height: '50px'}} src={`${product.imagenes ? product.imagenes[0] : product.imagen}`}/>
          <p>Producto: {product.titulo}{product.nombre}</p>
        </div>
        
        <div>
          <div className='modal-tallas'>
        {Object.entries(product.tallas).map(([size, colors]) => (
          <div key={`${product.codigo}-${size}`} className="size-section">
            <h3>{size}</h3>
            {colors.map((color, index) => (
              <div className="color-input lista-productos" key={color._id}>
                <div
                  style={{
                    backgroundColor: color.color,
                    borderRadius: "50%",
                    border: "1px solid gray",
                    height: "30px",
                    width: "30px",
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.305)'
                  }}
                ></div>
                {/* <p>
                  Quantity:{" "}
                  {color.quantity -
                    (parseInt(quantityChangesModal[`${product.codigo}-${size}-${index}`], 10) || 0)}
                </p> */}
                {/* <input
                style={{width: "200px",}}
                  type="number"
                  value={quantityChangesModal[`${product.codigo}-${size}-${index}`] || ""}
                  onChange={(e) =>
                    onChangeModal(size, index, e.target.value)
                  }
                /> */}
                {color.quantity < 1 ? (
                  <div>
                    <p>Agotados</p>
                    <input
                style={{width: "70%",}}
                className='input-titulo'
                  type="number"
                  value={quantityChangesModal[`${product.codigo}-${size}-${index}`] || ""}
                  onChange={(e) =>
                    onChangeModal(size, index, e.target.value)
                  }
                /> 
                    </div>
              ) : (
                <input
                style={{width: "70%",}}
                  type="number"
                  value={quantityChangesModal[`${product.codigo}-${size}-${index}`] || ""}
                  onChange={(e) =>
                    onChangeModal(size, index, e.target.value)
                  }
                /> 
              )}
              </div>
            ))}
          </div>
        ))}
        </div>
        </div>
        {/* <div className='modal-buy-buttons'>

        <ReactWhatsapp
            className='modal-button'
            style={{backgroundColor: 'rgb(0, 255, 64)', border: '1px solid rgb(0, 255, 64)'}}
          number="+58 4124668486"
          message={`¡Hola! 👋 ¡Bienvenido a Surtymas!
Mi correo es: ${user}
Mi compra es la siguiente:
                            
                            ${results?.map((product) => {
                              let message = `"${product.titulo}". Precio: $${product.precio}, Precio al mayor: $${product.precio_mayor}, Codigo: ${product.codigo}`;
                              if (product.tallas) {
                                const tallasMessage = Object.entries(product.tallas)
                                  .map(([size, colors]) => {
                                    const deseos = colors.filter((color) => color.deseo !== 0);
                                    if (deseos.length > 0) {
                                      const deseosMessage = deseos
                                        .map((color) => `${size}: ${color.deseo}`)
                                        .join(", ");
                                      return deseosMessage;
                                    }
                                    return null;
                                  })
                                  .filter((message) => message !== null)
                                  .join("\n");
                                if (tallasMessage !== "") {
                                  message += `\nTallas: \n${tallasMessage} piezas`;
                                }
                              }
                              return message;
                            })}
                            Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}
        >
          Comprar por WhatsApp
        </ReactWhatsapp>
        <button className='modal-button' onClick={closeModal}>Cancelar</button>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default ModalBuy;