import React, { useState } from 'react';

const GenderRadioFilter = ({ onFilter, products }) => {
  const [selectedSexo, setSelectedSexo] = useState();

  const handleSexoChange = (sexo) => {
    setSelectedSexo(sexo);
    console.log(selectedSexo)
    // onFilter(sexo);
    const updatedProducts = products?.filter(
      obj =>obj.sexo === "hombre" || obj.sexo === selectedSexo
    );
    console.log(updatedProducts)
    onFilter(updatedProducts);
  };

  

  return (
    <div className="gender-radio-filter">
        
        <div className='gender'>
            <p>Mujer</p>
            <input
            type="radio"
            name="sexo"
            value="mujer"
            onChange={() => handleSexoChange('mujer')}
            checked={selectedSexo === 'mujer'}
            /> 
        

        </div>
        <div className='gender'>
            <p>Hombre</p>
                <input
                type="radio"
                name="sexo"
                value="hombre"
                onChange={() => handleSexoChange('hombre')}
                checked={selectedSexo === 'hombre'}
                /> 
            
        </div>
    </div>
  );
};

export default GenderRadioFilter;
