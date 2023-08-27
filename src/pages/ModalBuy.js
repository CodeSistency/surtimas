import React from 'react';
import ReactWhatsapp from 'react-whatsapp';

const ModalBuy = (props) => {
  const { closeModal, product, user } = props;

  return (
    <div className="modal-buy">
      <div className="modal-content-buy">
        <h3>¿Estás seguro de realizar esta compra?</h3>
        <p>Producto: {product.titulo}</p>
        <div className='modal-buy-buttons'>

        <ReactWhatsapp
            className='modal-button'
            style={{backgroundColor: 'rgb(0, 255, 64)', border: '1px solid rgb(0, 255, 64)'}}
          number="+58 4124668486"
          message={`¡Hola! 👋 ¡Bienvenido a Surtymas!
Mi correo es: ${user}
Mi compra es:

"${product.titulo}". Precio: ${product.precio} Codigo: ${product.codigo}`}
        >
          Comprar por WhatsApp
        </ReactWhatsapp>
        <button className='modal-button' onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBuy;