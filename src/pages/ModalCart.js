import React from 'react';
import ReactWhatsapp from 'react-whatsapp';

const ModalCart = (props) => {
  const { closeModal, cart, user} = props;

  console.log(cart)

  return (
    <div className="modal-buy">
      <div className="modal-content-buy">
        <h3>¿Estás seguro de realizar esta compra?</h3>
        {/* <p>Producto: {product.titulo}</p> */}
        <div className='modal-buy-buttons'>

        <ReactWhatsapp 
                            className='buy-total'
                            style={{borderRadius: '10px'}} 
                            number='+58 4124668486'
                            message={`¡Hola! 👋 ¡Bienvenido a Surtymas!
Mi correo es: ${user}
Mi compra es la siguiente:

${cart?.cartProducts.map(product => (
`"${product.nombre}". Precio: $${product.precio} Codigo: ${product.codigo}`
))}

Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                            >Comprar</ReactWhatsapp> 
        <button className='modal-button' onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;