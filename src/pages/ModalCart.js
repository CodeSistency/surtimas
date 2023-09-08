import React, {useState} from 'react';
import ReactWhatsapp from 'react-whatsapp';
import ModalBuyCart from './ModalBuyCart';
import useAuth from '../hooks/useAuth';

const ModalCart = (props) => {
  const { closeModal, cart, setCart, user} = props;

  const {auth} = useAuth()
  console.log(cart)

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState()

  const openModal = () => {
    
    setModalOpen(true);
  };

  const closeModalBuy = () => {
    setModalOpen(false);
    console.log('log')
  };

  return (
    <div className='modal-overlay'>
    <div className="modal-buy">
      <div className="modal-content-buy">
        <h3>¿Estás seguro de realizar esta compra?</h3>
        {/* <p>Producto: {product.titulo}</p> */}
        <div className='modal-info-container'>
        {cart?.cartProducts.map(product => (
          <div className='modal-info' onClick={() => {
            setSelectedProduct(product);
            setModalOpen(true);
          }}>
            <img src={product.imagen}/>
            <p >{product.nombre}</p>
      
          </div>
        ))}
        </div>
              {modalOpen && (
        <ModalBuyCart closeModalBuy={closeModalBuy} product={selectedProduct} user={auth?.user} setResults={setCart} 
        results={cart}/>
      )}
        <div className='modal-buy-buttons'>

        <ReactWhatsapp 
                            className='modal-button'
                            style={{borderRadius: '10px', backgroundColor:'rgb(5, 248, 78)', border: '1px solid rgb(5, 248, 78)'}} 
                            number='+58 4124668486'
                            message={`¡Hola! 👋 ¡Bienvenido a Surtymas! 
Mi correo es: ${user}
Mi compra es la siguiente:
                            
${cart?.cartProducts.map((product) => {
                              let message = `"${product.nombre}". Precio: $${product.precio}, Precio al mayor: $${product.precio_mayor}, Codigo: ${product.codigo}`;
                              if (product.tallas) {
                                const tallasMessage = Object.entries(product.tallas)
                                  .map(([size, colors]) => {
                                    const deseos = colors.filter((color) => color.deseo !== 0);
                                    if (deseos.length > 0) {
                                      const deseosMessage = deseos
                                        .map((color) => `${size}: ${color.deseo}`)
                                        // .join(", ");
                                      return deseosMessage;
                                    }
                                    return null;
                                  })
                                  .filter((message) => message !== null)
                                  .join("\n");
                                if (tallasMessage !== "") {
                                  message += `\nTallas: \n${tallasMessage} piezas\n`;
                                }
                              }
                              return message;
                            })}
Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                            >Comprar</ReactWhatsapp> 
        <button className='modal-button' onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ModalCart;