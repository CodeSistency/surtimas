import React, { useEffect, useState } from 'react';

const FilterCategory = ({ objects, onFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    console.log(selectedTypes)
    
  };
 

  

  function handleFilterClick(){
    const filteredObjects = objects.filter(obj => selectedTypes.includes(obj.tipo));
    // const filteredObjects = objects.filter(
    //   obj =>
    //     (selectedTypes.length === 0 || selectedTypes.includes(obj.tipo)) &&
    //     (selectedSexo === 'all' || obj.sexo === selectedSexo)
    // );
    console.log(filteredObjects)
    onFilter(filteredObjects)
  }

  
//   const filteredObjects = objects.filter(obj => selectedTypes.includes(obj.tipo));
    

//   const filteredObjects = objects.filter(obj => selectedTypes.includes(obj.tipo));
  
  return (
    <div className='category-filter'>
      <div className='categories'>
        <div className='category'>
          <p>Camisa</p>
          <input type="checkbox" onChange={() => handleTypeChange('camisa')} /> 
        </div>
        <div className='category'> 
          <p>Franela</p>
          <input type="checkbox" onChange={() => handleTypeChange('franela')} /> 
        </div>
        <div className='category'> 
          <p>Blusa</p>
          <input type="checkbox" onChange={() => handleTypeChange('blusa')} /> 
        </div>
        <div className='category'> 
          <p>Chaqueta</p>
          <input type="checkbox" onChange={() => handleTypeChange('chaqueta')} /> 
        </div>
        <div className='category'> 
          <p>Blazer</p>
          <input type="checkbox" onChange={() => handleTypeChange('blazer')} /> 
        </div>
        <div className='category'> 
          <p>Vestido</p>
          <input type="checkbox" onChange={() => handleTypeChange('vestido')} /> 
        </div>
        <div className='category'> 
          <p>Conjuntos</p>
          <input type="checkbox" onChange={() => handleTypeChange('conjuntos')} /> 
        </div>
        <div className='category'> 
          <p>Set</p>
          <input type="checkbox" onChange={() => handleTypeChange('set')} /> 
        </div>
        <div className='category'> 
          <p>Sueter</p>
          <input type="checkbox" onChange={() => handleTypeChange('sueter')} /> 
        </div>
        <div className='category'> 
          <p>Body</p>
          <input type="checkbox" onChange={() => handleTypeChange('body')} /> 
        </div>
        <div className='category'> 
          <p>Crop top</p>
          <input type="checkbox" onChange={() => handleTypeChange('crop top')} /> 
        </div>
        <div className='category'> 
          <p>Short</p>
          <input type="checkbox" onChange={() => handleTypeChange('short')} /> 
        </div>
        <div className='category'> 
          <p>Falda</p>
          <input type="checkbox" onChange={() => handleTypeChange('falda')} /> 
        </div>
        <div className='category'> 
          <p>Leggins</p>
          <input type="checkbox" onChange={() => handleTypeChange('leggins')} /> 
        </div>
        <div className='category'> 
          <p>Pijama</p>
          <input type="checkbox" onChange={() => handleTypeChange('pijama')} /> 
        </div>
        <div className='category'> 
          <p>Playa</p>
          <input type="checkbox" onChange={() => handleTypeChange('playa')} /> 
        </div>
        <div className='category'> 
          <p>Mono</p>
          <input type="checkbox" onChange={() => handleTypeChange('mono')} /> 
        </div>
        <div className='category'> 
          <p>Zapato</p>
          <input type="checkbox" onChange={() => handleTypeChange('zapato')} /> 
        </div>
        <div className='category'> 
          <p>Liquidacion</p>
          <input type="checkbox" onChange={() => handleTypeChange('liquidacion')} /> 
        </div>
        <div className='category'> 
          <p>Sobretodo</p>
          <input type="checkbox" onChange={() => handleTypeChange('sobretodo')} /> 
        </div>
        <div className='category'> 
          <p>Pantalon</p>
          <input type="checkbox" onChange={() => handleTypeChange('pantalon')} /> 
        </div>
        {/* Add more checkboxes for other types if needed */}
      </div>
      
      <button onClick={handleFilterClick}>Filtrar</button>
      {/* <div>
        {filteredObjects.map((obj, index) => (
          <div key={index}>
            <p>{obj.titulo}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FilterCategory;
