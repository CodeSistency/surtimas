import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Menu = ({isOpen, toggleMenu}) => {
  

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

  return (
    
    <div>
    <BiMenu onClick={toggleMenu} className="menu-icon" color="black" style={{marginTop: '7px', cursor: 'pointer'}} fontSize={45} />
    {isOpen && <div className="overlay" onClick={toggleMenu} />}
    <div className={`menu-container ${isOpen ? 'visible' : ''}`}>
      <button className="close-button" onClick={toggleMenu}>
        Cerrar
      </button>
      <div className="menu-content">
        <ul>
        <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/registro'}>Registro</Link></li>
          <li><Link to={'/productos'}>Produtos</Link></li>
          <li><Link to={'/carrito'}>Carro</Link></li>
          <li><Link to={'/admin'}>Admin</Link></li>
          {/* <li><a href="#">Mujer</a></li>
          <li><a href="#">Hombre</a></li>
          <li><a href="#">Zapatos</a></li>
          <li><a href="#">Juguetes</a></li> */}
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default Menu;