import React from 'react';
import ReactWhatsapp from 'react-whatsapp';

const ModalDelete = (props) => {
  const { closeModal, product, user, handleDelete } = props;

  return (
    <div className="modal-buy">
      <div className="modal-content-buy">
        <h3>¿Estás seguro que quieres borrar este producto?</h3>
        <p>Producto: {product.titulo}</p>
        <div className='modal-buy-buttons'>

        <button className='modal-button' onClick={() => handleDelete(product._id)}>Borrar</button>
        <button className='modal-button' onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;