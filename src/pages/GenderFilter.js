import React, { useState } from 'react';

const GenderRadioFilter = ({ onFilter }) => {
  const [selectedSexo, setSelectedSexo] = useState('todos');

  const handleSexoChange = (sexo) => {
    setSelectedSexo(sexo);
    onFilter(sexo);
  };

  return (
    <div className="gender-radio-filter">
        <div className='gender'>
        <p>Todos</p>
            <input
            type="radio"
            name="sexo"
            value="all"
            onChange={() => handleSexoChange('todos')}
            checked={selectedSexo === 'todos'}
            /> 
        

        </div>
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
