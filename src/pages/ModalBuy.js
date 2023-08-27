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
          number="+58 4249670445"
          message={`¡Hola! 👋 ¡Bienvenido a Surtymas!\n
          Mi correo es: ${user}\n
          Mi compra es:\n
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