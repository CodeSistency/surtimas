import { useState } from "react";

const ModalBuyCart = ({ product, closeModalBuy, handleApplyChanges, setQuantityChanges, results, setResults }) => {
    const [quantityChangesModal, setQuantityChangesModal] = useState({});
  
    const onChangeModal = (size, index, value) => {
      const changeKey = `${product.codigo}-${size}-${index}`;
      setQuantityChangesModal((prevChanges) => ({
        ...prevChanges,
        [changeKey]: parseInt(value, 10),
      }));
      console.log(changeKey)
      console.log(quantityChangesModal)
    };

    const applyChangesModal = () => {
        const updatedResults = results?.cartProducts?.map((prod) => {
          if (prod.codigo === product.codigo) {
            const updatedTallas = { ...prod.tallas };
            Object.keys(updatedTallas).forEach((size) => {
              updatedTallas[size].forEach((color, index) => {
                const changeKey = `${product.codigo}-${size}-${index}`;
                const changeValue = parseInt(quantityChangesModal[changeKey], 10) || 0;
                color.quantity -= changeValue;
                color.deseo = changeValue
              });
            });
            return { ...prod, tallas: updatedTallas };
          }
          return prod;
        });
    
        setResults(updatedResults); // Update the results array
        closeModalBuy();
        // handleApplyChanges();
      };
  
    // const applyChangesModal = () => {
    //   setQuantityChanges((prevChanges) => ({
    //     ...prevChanges,
    //     ...quantityChangesModal,
    //   }));
      
    //   console.log(quantityChangesModal)
    //   onClose();
    //   handleApplyChanges();
    // };

    
  
    return (
    // <div className="modal-overlay">
    //   <div className="modal-content">
    <div >
      <div >
        <h2 style={{color:'black'}}>Producto: {product.nombre}</h2>
        <hr />
        {Object.entries(product.tallas).map(([size, colors]) => (
          <div key={`${product.codigo}-${size}`} className="size-section">
            <h3>{size}</h3>
            {colors.map((color, index) => (
              <div className="color-input lista-productos" key={color._id}>
                <div
                  style={{
                    backgroundColor: color.color,
                    borderRadius: "50%",
                    border: "1px solid black",
                    height: "30px",
                    width: "30px",
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
                {color.quantity === 0 ? (
                <p>No disponible</p>
              ) : (
                <input
                  style={{ width: "70%" }}
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
        <div className="modal-buttons">
          <button onClick={applyChangesModal} style={{backgroundColor:' rgb(5, 248, 78)', border: '1px solid rgb(5, 248, 78)'}}>Actualizar</button>
          <button onClick={closeModalBuy}>Cancelar</button>
        </div>
      </div>
    </div>
    );
  };

  export default ModalBuyCart