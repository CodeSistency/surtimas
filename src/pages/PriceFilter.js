import React, { useState } from 'react';

const PriceFilter = ({ products, onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterClick = () => {
    const filteredProducts = products.filter(product => {
      if (minPrice !== '' && product.precio < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice !== '' && product.precio > parseFloat(maxPrice)) {
        return false;
      }
      return true;
    });

    onFilter(filteredProducts);
  };

  return (
    <div className="price-filter">
      
      <div className='price-min'>
        <p>Min:</p>
        <input
          type="number"
          id="min-price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
      </div>

      <div className='price-min'>
      <p>Max:</p>
        <input
          type="number"
          id="max-price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>


      

      <button onClick={handleFilterClick}>Filtrar</button>
    </div>
  );
};

export default PriceFilter;
