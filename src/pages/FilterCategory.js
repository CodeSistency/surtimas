import React, { useEffect, useState } from 'react';

const FilterCategory = ({ objects, onFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    
  };
 

  

  function handleFilterClick(){
    const filteredObjects = objects.filter(obj => selectedTypes.includes(obj.tipo));
    // const filteredObjects = objects.filter(
    //   obj =>
    //     (selectedTypes.length === 0 || selectedTypes.includes(obj.tipo)) &&
    //     (selectedSexo === 'all' || obj.sexo === selectedSexo)
    // );

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
