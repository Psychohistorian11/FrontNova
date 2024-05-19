import React from 'react';
import HomeContext1 from '../Home/images/context_home_image_1.png';
import HomeContext2 from '../Home/images/context_home_image_2.png';
import HomeContext3 from '../Home/images/context_home_image_3.png';

const ThreeDivsComponent = () => {

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '570px',
    marginTop: '20px',
  };

  const contentStyle = {
    backgroundColor: '#6EBDD1',
    padding: '20px',
    marginRight: '20px',
    width: '400px',
    height: '440px',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer', 
    margin: '0 10px',
  };

  const imageStyle = {
    width: '100%', 
    display: 'block',
    borderRadius: '8px',
  };

  const handleMouseOver = (event) => {
    event.currentTarget.style.transform = 'scale(1.05)';
    event.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseOut = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
    event.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className='flex flex-col my-10' style={divStyle}>
      <div>
        <h1 className='text-4xl font-bold mb-10' >SOBRE NOSOTROS</h1>
      </div>

      <div className='flex'>
        <div className='bg-bluecolor p-8 rounded-lg mx-2 w-80' style={contentStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={HomeContext1} alt="" style={imageStyle} />
          <h1 className='text-2xl font-extrabold dark:text-white'>NUESTRA EMPRESA NOVA</h1>
          <p className='text-white font-montserrat'>Somos Nova, especializados en mejorar la gestión de inventarios para arrendamientos. Descubre cómo nuestra plataforma facilita el control eficiente de tus activos inmobiliarios. Únete para una gestión de propiedades de alquiler más eficiente.</p>
        </div>

        <div className='bg-bluecolor p-8 rounded-lg mx-2 w-80' style={contentStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={HomeContext2} alt="" style={imageStyle} />
          <h1 className='text-2xl font-extrabold dark:text-white'>SUPERVISA TU INVENTARIO</h1>
          <p className='text-white font-montserrat'>Descubre cómo nuestra aplicación simplifica la supervisión del inventario permitiéndote crear espacios detallados para cada propiedad. Desde subir fotos y videos hasta registrar el estado de cada artículo, gestionar tu inventario nunca ha sido tan fácil y efectivo.</p>
        </div>

        <div className='bg-bluecolor p-8 rounded-lg mx-2 w-80' style={contentStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <img src={HomeContext3} alt="" style={imageStyle} />
          <h1 className='text-2xl font-extrabold dark:text-white'>UNETE A NUESTRA COMUNIDAD</h1>
          <p className='text-white font-montserrat'>Únete a nuestra comunidad de propietarios y agentes comerciales para una gestión de inventarios más efectiva. Conecta, comparte y aprende con nosotros para optimizar la administración de tus propiedades.</p>
        </div>
      </div>

    </div>
  );
};

export default ThreeDivsComponent;
